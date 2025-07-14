// // // import React, { useState, useEffect } from 'react';
// // // import axios from 'axios';

// // // const PLCComponent = ({ selectedProjectId }) => {
// // //   const [billingRatesSchedule, setBillingRatesSchedule] = useState([]);
// // //   const [newRate, setNewRate] = useState(null);
// // //   const [loading, setLoading] = useState(false);
// // //   const [editBillRate, setEditBillRate] = useState({});

// // //   // Fetch billing rates schedule based on selected project ID
// // //   useEffect(() => {
// // //     console.log("Fetching billing rates for project:", selectedProjectId);
// // //     const fetchBillingRates = async () => {
// // //       if (!selectedProjectId) return;
// // //       setLoading(true);
// // //       try {
// // //         const response = await axios.get(`https://test-api-3tmq.onrender.com/api/ProjectPlcRates`);
// // //         const filteredData = response.data.filter(item =>
// // //           item.projId.toLowerCase().startsWith(selectedProjectId.toLowerCase())
// // //         );
// // //         console.log("Fetched data:", filteredData); // Debug log
// // //         setBillingRatesSchedule(filteredData.map(item => ({
// // //           id: item.id,
// // //           plc: item.laborCategoryCode,
// // //           billRate: item.billingRate,
// // //           rateType: null,
// // //           startDate: item.effectiveDate.split('T')[0], // Remove time
// // //           endDate: item.endDate ? item.endDate.split('T')[0] : null,
// // //         })));
// // //         // Reset editBillRate state with current values
// // //         const newEditBillRate = {};
// // //         filteredData.forEach(item => {
// // //           newEditBillRate[item.id] = item.billingRate;
// // //         });
// // //         setEditBillRate(newEditBillRate);
// // //       } catch (error) {
// // //         console.error('Error fetching billing rates:', error);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };
// // //     fetchBillingRates();
// // //   }, [selectedProjectId]);

// // //   const handleUpdate = async (id, updatedData) => {
// // //     setLoading(true);
// // //     try {
// // //       console.log('Update payload:', {
// // //         id,
// // //         projId: selectedProjectId,
// // //         laborCategoryCode: updatedData.plc,
// // //         costRate: updatedData.billRate * 0.65,
// // //         billingRate: updatedData.billRate,
// // //         effectiveDate: updatedData.startDate,
// // //         endDate: updatedData.endDate || null,
// // //         isActive: true,
// // //         modifiedBy: "admin",
// // //         createdAt: new Date().toISOString(),
// // //         updatedAt: new Date().toISOString(),
// // //       });
// // //       const response = await axios.put(`https://test-api-3tmq.onrender.com/api/ProjectPlcRates/${id}`, {
// // //         id,
// // //         projId: selectedProjectId,
// // //         laborCategoryCode: updatedData.plc,
// // //         costRate: updatedData.billRate * 0.65, // Adjust based on backend requirement
// // //         billingRate: updatedData.billRate,
// // //         effectiveDate: updatedData.startDate,
// // //         endDate: updatedData.endDate || null,
// // //         isActive: true,
// // //         modifiedBy: "admin",
// // //         createdAt: new Date().toISOString(),
// // //         updatedAt: new Date().toISOString(),
// // //       });
// // //       // Refresh data after update
// // //       const fetchResponse = await axios.get(`https://test-api-3tmq.onrender.com/api/ProjectPlcRates`);
// // //       const filteredData = fetchResponse.data.filter(item =>
// // //         item.projId.toLowerCase().startsWith(selectedProjectId.toLowerCase())
// // //       );
// // //       setBillingRatesSchedule(filteredData.map(item => ({
// // //         id: item.id,
// // //         plc: item.laborCategoryCode,
// // //         billRate: item.billingRate,
// // //         rateType: null,
// // //         startDate: item.effectiveDate.split('T')[0],
// // //         endDate: item.endDate ? item.endDate.split('T')[0] : null,
// // //       })));
// // //       // Update editBillRate with the new value
// // //       setEditBillRate(prev => ({ ...prev, [id]: updatedData.billRate }));
// // //     } catch (error) {
// // //       console.error('Error updating billing rate:', {
// // //         status: error.response?.status,
// // //         data: error.response?.data,
// // //         message: error.message,
// // //       });
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleDelete = async (id) => {
// // //     setLoading(true);
// // //     try {
// // //       await axios.delete(`https://test-api-3tmq.onrender.com/api/ProjectPlcRates/${id}`);
// // //       // Refresh data after delete
// // //       const response = await axios.get(`https://test-api-3tmq.onrender.com/api/ProjectPlcRates`);
// // //       const filteredData = response.data.filter(item =>
// // //         item.projId.toLowerCase().startsWith(selectedProjectId.toLowerCase())
// // //       );
// // //       setBillingRatesSchedule(filteredData.map(item => ({
// // //         id: item.id,
// // //         plc: item.laborCategoryCode,
// // //         billRate: item.billingRate,
// // //         rateType: null,
// // //         startDate: item.effectiveDate.split('T')[0],
// // //         endDate: item.endDate ? item.endDate.split('T')[0] : null,
// // //       })));
// // //       // Remove from editBillRate
// // //       setEditBillRate(prev => {
// // //         const newEditBillRate = { ...prev };
// // //         delete newEditBillRate[id];
// // //         return newEditBillRate;
// // //       });
// // //     } catch (error) {
// // //       console.error('Error deleting billing rate:', error);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleAddRow = () => {
// // //     setNewRate({ plc: '', billRate: 0, startDate: '', endDate: '' });
// // //   };

// // //   const handleSaveNewRate = async () => {
// // //     if (!newRate || !newRate.plc || !newRate.startDate || !newRate.billRate) {
// // //       console.error('Please fill all required fields (PLC, Bill Rate, Start Date)');
// // //       return;
// // //     }
// // //     setLoading(true);
// // //     try {
// // //       const response = await axios.post(`https://test-api-3tmq.onrender.com/api/ProjectPlcRates`, {
// // //         id: 0,
// // //         projId: selectedProjectId,
// // //         laborCategoryCode: newRate.plc,
// // //         costRate: newRate.billRate * 0.65,
// // //         billingRate: newRate.billRate,
// // //         effectiveDate: newRate.startDate,
// // //         endDate: newRate.endDate || null,
// // //         isActive: true,
// // //         modifiedBy: "admin",
// // //         createdAt: new Date().toISOString(),
// // //         updatedAt: new Date().toISOString(),
// // //       });
// // //       setNewRate(null);
// // //       // Refresh data
// // //       const fetchResponse = await axios.get(`https://test-api-3tmq.onrender.com/api/ProjectPlcRates`);
// // //       const filteredData = fetchResponse.data.filter(item =>
// // //         item.projId.toLowerCase().startsWith(selectedProjectId.toLowerCase())
// // //       );
// // //       setBillingRatesSchedule(filteredData.map(item => ({
// // //         id: item.id,
// // //         plc: item.laborCategoryCode,
// // //         billRate: item.billingRate,
// // //         rateType: null,
// // //         startDate: item.effectiveDate.split('T')[0],
// // //         endDate: item.endDate ? item.endDate.split('T')[0] : null,
// // //       })));
// // //     } catch (error) {
// // //       console.error('Error adding billing rate:', error.response ? error.response.data : error.message);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleNewRateChange = (field, value) => {
// // //     setNewRate(prev => ({ ...prev, [field]: value }));
// // //   };

// // //   const handleBillRateChange = (id, value) => {
// // //     setEditBillRate(prev => ({ ...prev, [id]: parseFloat(value) || 0 }));
// // //   };

// // //   return (
// // //     <div className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16 text-xs">
// // //       {/* Commented out Project Labor Categories */}
// // //       {/* <div className="mb-4">
// // //         <h3 className="text-xs font-normal">Project Labor Categories</h3>
// // //         <div className="overflow-x-auto">
// // //           <table className="w-full text-xs border-collapse">
// // //             <thead>
// // //               <tr className="bg-gray-100">
// // //                 <th className="border p-1 font-normal">PLC</th>
// // //                 <th className="border p-1 font-normal">PLC Description</th>
// // //                 <th className="border p-1 font-normal">Source</th>
// // //                 <th className="border p-1 font-normal">Link to Project PLC</th>
// // //                 <th className="border p-1 font-normal">Project PLC</th>
// // //                 <th className="border p-1 font-normal">Project PLC Description</th>
// // //                 <th className="border p-1 font-normal">Cloned</th>
// // //                 <th className="border p-1 font-normal">Originating Project</th>
// // //               </tr>
// // //             </thead>
// // //             <tbody>
// // //               {plcData.map((item, index) => (
// // //                 <tr key={index} className="sm:table-row flex flex-col sm:flex-row mb-1 sm:mb-0">
// // //                   <td className="border p-1 sm:w-1/8">
// // //                     <input type="text" value={item.plc || ''} onChange={(e) => handlePlcChange(index, 'plc', e.target.value)} className="w-full p-1 border rounded" />
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/8">
// // //                     <input type="text" value={item.plcDescription || ''} onChange={(e) => handlePlcChange(index, 'plcDescription', e.target.value)} className="w-full p-1 border rounded" />
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/8">
// // //                     <input type="text" value={item.source || ''} onChange={(e) => handlePlcChange(index, 'source', e.target.value)} className="w-full p-1 border rounded" />
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/8">
// // //                     <input type="text" value={item.linkToProjectPLC || ''} onChange={(e) => handlePlcChange(index, 'linkToProjectPLC', e.target.value)} className="w-full p-1 border rounded" />
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/8">
// // //                     <input type="text" value={item.projectPLC || ''} onChange={(e) => handlePlcChange(index, 'projectPLC', e.target.value)} className="w-full p-1 border rounded" />
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/8">
// // //                     <input type="text" value={item.projectPLCDescription || ''} onChange={(e) => handlePlcChange(index, 'projectPLCDescription', e.target.value)} className="w-full p-1 border rounded" />
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/8">
// // //                     <input type="text" value={item.cloned || ''} onChange={(e) => handlePlcChange(index, 'cloned', e.target.value)} className="w-full p-1 border rounded" />
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/8">
// // //                     <input type="text" value={item.originatingProject || ''} onChange={(e) => handlePlcChange(index, 'originatingProject', e.target.value)} className="w-full p-1 border rounded" />
// // //                   </td>
// // //                 </tr>
// // //               ))}
// // //             </tbody>
// // //           </table>
// // //         </div>
// // //       </div> */}

// // //       <div className="mb-4">
// // //         <h3 className="text-xs font-normal">Project Labor Categories Billing Rates Schedule</h3>
// // //         <div className="overflow-x-auto">
// // //           <table className="w-full text-xs border-collapse">
// // //             <thead>
// // //               <tr className="bg-gray-100">
// // //                 <th className="border p-1 font-normal">Plc</th>
// // //                 <th className="border p-1 font-normal">Bill Rate</th>
// // //                 <th className="border p-1 font-normal">Rate Type</th>
// // //                 <th className="border p-1 font-normal">Start Date</th>
// // //                 <th className="border p-1 font-normal">End Date</th>
// // //                 <th className="border p-1 font-normal">Actions</th>
// // //               </tr>
// // //             </thead>
// // //             <tbody>
// // //               {loading ? (
// // //                 <tr><td colSpan="6" className="border p-1 text-center">Loading...</td></tr>
// // //               ) : billingRatesSchedule.length === 0 ? (
// // //                 <tr><td colSpan="6" className="border p-1 text-center">No data available</td></tr>
// // //               ) : (
// // //                 billingRatesSchedule.map((item) => (
// // //                   <tr key={item.id} className="sm:table-row flex flex-col sm:flex-row mb-1 sm:mb-0">
// // //                     <td className="border p-1 sm:w-1/6">{item.plc}</td>
// // //                     <td className="border p-1 sm:w-1/6">
// // //                       <input
// // //                         type="number"
// // //                         value={editBillRate[item.id] || item.billRate}
// // //                         onChange={(e) => handleBillRateChange(item.id, e.target.value)}
// // //                         className="w-full p-1 border rounded text-xs"
// // //                       />
// // //                     </td>
// // //                     <td className="border p-1 sm:w-1/6">{item.rateType}</td>
// // //                     <td className="border p-1 sm:w-1/6">{item.startDate}</td>
// // //                     <td className="border p-1 sm:w-1/6">{item.endDate}</td>
// // //                     <td className="border p-1 sm:w-1/6">
// // //                       <div className="flex flex-col sm:flex-row justify-center space-y-1 sm:space-y-0 sm:space-x-1">
// // //                         <button
// // //                           onClick={() => handleUpdate(item.id, { ...item, billRate: editBillRate[item.id] || item.billRate })}
// // //                           className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-yellow-600 transition w-full sm:w-auto"
// // //                           disabled={loading}
// // //                         >
// // //                           Update
// // //                         </button>
// // //                         <button
// // //                           onClick={() => handleDelete(item.id)}
// // //                           className="bg-red-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-red-600 transition w-full sm:w-auto"
// // //                           disabled={loading}
// // //                         >
// // //                           Delete
// // //                         </button>
// // //                       </div>
// // //                     </td>
// // //                   </tr>
// // //                 ))
// // //               )}
// // //               {newRate && (
// // //                 <tr className="sm:table-row flex flex-col sm:flex-row mb-1 sm:mb-0">
// // //                   <td className="border p-1 sm:w-1/6">
// // //                     <input
// // //                       type="text"
// // //                       value={newRate.plc || ''}
// // //                       onChange={(e) => handleNewRateChange('plc', e.target.value)}
// // //                       className="w-full p-1 border rounded text-xs"
// // //                     />
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/6">
// // //                     <input
// // //                       type="number"
// // //                       value={newRate.billRate || ''}
// // //                       onChange={(e) => handleNewRateChange('billRate', parseFloat(e.target.value) || 0)}
// // //                       className="w-full p-1 border rounded text-xs"
// // //                     />
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/6">
// // //                     <input
// // //                       type="text"
// // //                       value={newRate.rateType || ''}
// // //                       disabled
// // //                       className="w-full p-1 border rounded text-xs"
// // //                     />
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/6">
// // //                     <input
// // //                       type="text"
// // //                       value={newRate.startDate || ''}
// // //                       onChange={(e) => handleNewRateChange('startDate', e.target.value)}
// // //                       className="w-full p-1 border rounded text-xs"
// // //                     />
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/6">
// // //                     <input
// // //                       type="text"
// // //                       value={newRate.endDate || ''}
// // //                       onChange={(e) => handleNewRateChange('endDate', e.target.value)}
// // //                       className="w-full p-1 border rounded text-xs"
// // //                     />
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/6">
// // //                     <div className="flex flex-col sm:flex-row justify-center space-y-1 sm:space-y-0 sm:space-x-1">
// // //                       <button
// // //                         onClick={handleSaveNewRate}
// // //                         className="bg-green-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-green-600 transition w-full sm:w-auto"
// // //                         disabled={loading}
// // //                       >
// // //                         Save
// // //                       </button>
// // //                       <button
// // //                         onClick={() => setNewRate(null)}
// // //                         className="bg-gray-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-gray-600 transition w-full sm:w-auto"
// // //                         disabled={loading}
// // //                       >
// // //                         Cancel
// // //                       </button>
// // //                     </div>
// // //                   </td>
// // //                 </tr>
// // //               )}
// // //               <tr>
// // //                 <td colSpan="6" className="border p-1">
// // //                   <button
// // //                     onClick={handleAddRow}
// // //                     className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-blue-600 transition"
// // //                     disabled={loading || newRate}
// // //                   >
// // //                     Add
// // //                   </button>
// // //                 </td>
// // //               </tr>
// // //             </tbody>
// // //           </table>
// // //         </div>
// // //       </div>

// // //       <div className="mb-4">
// // //         <h3 className="text-xs font-normal">Employee Billing Rates Schedule</h3>
// // //         <div className="overflow-x-auto">
// // //           <table className="w-full text-xs border-collapse">
// // //             <thead>
// // //               <tr className="bg-gray-100">
// // //                 <th className="border p-1 font-normal">LookupType</th>
// // //                 <th className="border p-1 font-normal">Employee</th>
// // //                 <th className="border p-1 font-normal">Employee Name</th>
// // //                 <th className="border p-1 font-normal">PLC</th>
// // //                 <th className="border p-1 font-normal">PLC Description</th>
// // //                 <th className="border p-1 font-normal">Source</th>
// // //                 <th className="border p-1 font-normal">Bill Rate</th>
// // //                 <th className="border p-1 font-normal">Rate Type</th>
// // //                 <th className="border p-1 font-normal">Start Date</th>
// // //                 <th className="border p-1 font-normal">End Date</th>
// // //               </tr>
// // //             </thead>
// // //             <tbody>
// // //               {/* Placeholder - Replace with actual data and handlers if needed */}
// // //               <tr><td colSpan="10" className="border p-1 text-center">Data not implemented</td></tr>
// // //             </tbody>
// // //           </table>
// // //         </div>
// // //       </div>

// // //       <div className="mb-4">
// // //         <h3 className="text-xs font-normal">Vendor Billing Rates Schedule</h3>
// // //         <div className="overflow-x-auto">
// // //           <table className="w-full text-xs border-collapse">
// // //             <thead>
// // //               <tr className="bg-gray-100">
// // //                 <th className="border p-1 font-normal">LookupType</th>
// // //                 <th className="border p-1 font-normal">Vendor</th>
// // //                 <th className="border p-1 font-normal">Vendor Name</th>
// // //                 <th className="border p-1 font-normal">Vendor Employee</th>
// // //                 <th className="border p-1 font-normal">Vendor Employee Name</th>
// // //                 <th className="border p-1 font-normal">PLC</th>
// // //                 <th className="border p-1 font-normal">PLC Description</th>
// // //                 <th className="border p-1 font-normal">Source</th>
// // //                 <th className="border p-1 font-normal">Bill Rate</th>
// // //                 <th className="border p-1 font-normal">Rate Type</th>
// // //                 <th className="border p-1 font-normal">Start Date</th>
// // //                 <th className="border p-1 font-normal">End Date</th>
// // //               </tr>
// // //             </thead>
// // //             <tbody>
// // //               {/* Placeholder - Replace with actual data and handlers if needed */}
// // //               <tr><td colSpan="12" className="border p-1 text-center">Data not implemented</td></tr>
// // //             </tbody>
// // //           </table>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default PLCComponent;

// // // import React, { useState, useEffect } from 'react';
// // // import axios from 'axios';

// // // const PLCComponent = ({ selectedProjectId }) => {
// // //   const [billingRatesSchedule, setBillingRatesSchedule] = useState([]);
// // //   const [newRate, setNewRate] = useState(null);
// // //   const [loading, setLoading] = useState(false);
// // //   const [editBillRate, setEditBillRate] = useState({});
// // //   const [employees, setEmployees] = useState([]);
// // //   const [employeeBillingRates, setEmployeeBillingRates] = useState([]);
// // //   const [newEmployeeRate, setNewEmployeeRate] = useState(null);
// // //   const [editEmployeeBillRate, setEditEmployeeBillRate] = useState({});
// // //   const [vendorBillingRates, setVendorBillingRates] = useState([]);
// // //   const [newVendorRate, setNewVendorRate] = useState(null);
// // //   const [editVendorBillRate, setEditVendorBillRate] = useState({});
// // //   const [plcs, setPlcs] = useState([]);
// // //   const [plcSearch, setPlcSearch] = useState('');

// // //   // Dropdown options
// // //   const lookupTypeOptions = ['Select', 'Employee', 'Contract Employee'];
// // //   const rateTypeOptions = ['Select', 'Billing', 'Actual'];

// // //   // Fetch billing rates schedule based on selected project ID
// // //   useEffect(() => {
// // //     const fetchBillingRates = async () => {
// // //       if (!selectedProjectId) return;
// // //       setLoading(true);
// // //       try {
// // //         const response = await axios.get(`https://test-api-3tmq.onrender.com/api/ProjectPlcRates`);
// // //         const filteredData = response.data.filter(item =>
// // //           item.projId.toLowerCase().startsWith(selectedProjectId.toLowerCase())
// // //         );
// // //         setBillingRatesSchedule(filteredData.map(item => ({
// // //           id: item.id,
// // //           plc: item.laborCategoryCode,
// // //           billRate: item.billingRate,
// // //           rateType: item.rateType || 'Select',
// // //           startDate: item.effectiveDate.split('T')[0],
// // //           endDate: item.endDate ? item.endDate.split('T')[0] : null,
// // //         })));
// // //         const newEditBillRate = {};
// // //         filteredData.forEach(item => {
// // //           newEditBillRate[item.id] = item.billingRate;
// // //         });
// // //         setEditBillRate(newEditBillRate);
// // //       } catch (error) {
// // //         console.error('Error fetching billing rates:', error);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };
// // //     fetchBillingRates();
// // //   }, [selectedProjectId]);

// // //   // Fetch employees for the selected project
// // //   useEffect(() => {
// // //     const fetchEmployees = async () => {
// // //       if (!selectedProjectId || typeof selectedProjectId !== 'string' || selectedProjectId.trim() === '') {
// // //         setEmployees([]);
// // //         return;
// // //       }
// // //       setLoading(true);
// // //       try {
// // //         const response = await axios.get(`https://test-api-3tmq.onrender.com/Project/GetEmployeesByProject/${selectedProjectId}`);
// // //         setEmployees(response.data.map(item => ({
// // //           empId: item.empId,
// // //           employeeName: item.employeeName
// // //         })));
// // //       } catch (error) {
// // //         console.error('Error fetching employees:', error);
// // //         setEmployees([]);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };
// // //     fetchEmployees();
// // //   }, [selectedProjectId]);

// // //   // Fetch PLCs for search
// // //   useEffect(() => {
// // //     const fetchPlcs = async () => {
// // //       if (!plcSearch) return;
// // //       try {
// // //         const response = await axios.get(`https://test-api-3tmq.onrender.com/Project/GetAllPlcs/P`);
// // //         const filteredPlcs = response.data
// // //           .filter(item => item.laborCategoryCode.toLowerCase().includes(plcSearch.toLowerCase()))
// // //           .map(item => ({
// // //             laborCategoryCode: item.laborCategoryCode,
// // //             description: item.description || ''
// // //           }));
// // //         setPlcs(filteredPlcs);
// // //       } catch (error) {
// // //         console.error('Error fetching PLCs:', error);
// // //       }
// // //     };
// // //     fetchPlcs();
// // //   }, [plcSearch]);

// // //   // Fetch employee billing rates using ProjEmplRt API
// // //   useEffect(() => {
// // //     const fetchEmployeeBillingRates = async () => {
// // //       if (!selectedProjectId) return;
// // //       setLoading(true);
// // //       try {
// // //         const response = await axios.get(`https://test-api-3tmq.onrender.com/ProjEmplRt`);
// // //         const filteredData = response.data.filter(item =>
// // //           item.projId.toLowerCase().startsWith(selectedProjectId.toLowerCase()) &&
// // //           item.emplId
// // //         );
// // //         setEmployeeBillingRates(filteredData.map(item => ({
// // //           id: item.id,
// // //           lookupType: item.lookupType || 'Select',
// // //           empId: item.emplId,
// // //           employeeName: item.employeeName || employees.find(emp => emp.empId === item.emplId)?.employeeName || '',
// // //           plc: item.laborCategoryCode,
// // //           plcDescription: item.description || '',
// // //           billRate: item.billingRate,
// // //           rateType: item.rateType || 'Select',
// // //           startDate: item.effectiveDate.split('T')[0],
// // //           endDate: item.endDate ? item.endDate.split('T')[0] : null,
// // //         })));
// // //         const newEditEmployeeBillRate = {};
// // //         filteredData.forEach(item => {
// // //           newEditEmployeeBillRate[item.id] = item.billingRate;
// // //         });
// // //         setEditEmployeeBillRate(newEditEmployeeBillRate);
// // //       } catch (error) {
// // //         console.error('Error fetching employee billing rates:', error);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };
// // //     fetchEmployeeBillingRates();
// // //   }, [selectedProjectId, employees]);

// // //   // Fetch vendor billing rates
// // //   useEffect(() => {
// // //     const fetchVendorBillingRates = async () => {
// // //       if (!selectedProjectId) return;
// // //       setLoading(true);
// // //       try {
// // //         const response = await axios.get(`https://test-api-3tmq.onrender.com/api/ProjectPlcRates`);
// // //         const filteredData = response.data.filter(item =>
// // //           item.projId.toLowerCase().startsWith(selectedProjectId.toLowerCase()) &&
// // //           item.vendorId
// // //         );
// // //         setVendorBillingRates(filteredData.map(item => ({
// // //           id: item.id,
// // //           lookupType: item.lookupType || 'Select',
// // //           vendorId: item.vendorId,
// // //           vendorName: item.vendorName || '',
// // //           vendorEmployee: item.vendorEmployee || '',
// // //           vendorEmployeeName: item.vendorEmployeeName || '',
// // //           plc: item.laborCategoryCode,
// // //           plcDescription: item.description || '',
// // //           billRate: item.billingRate,
// // //           rateType: item.rateType || 'Select',
// // //           startDate: item.effectiveDate.split('T')[0],
// // //           endDate: item.endDate ? item.endDate.split('T')[0] : null,
// // //         })));
// // //         const newEditVendorBillRate = {};
// // //         filteredData.forEach(item => {
// // //           newEditVendorBillRate[item.id] = item.billingRate;
// // //         });
// // //         setEditVendorBillRate(newEditVendorBillRate);
// // //       } catch (error) {
// // //         console.error('Error fetching vendor billing rates:', error);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };
// // //     fetchVendorBillingRates();
// // //   }, [selectedProjectId]);

// // //   const handleUpdate = async (id, updatedData) => {
// // //     setLoading(true);
// // //     try {
// // //       await axios.put(`https://test-api-3tmq.onrender.com/api/ProjectPlcRates/${id}`, {
// // //         id,
// // //         projId: selectedProjectId,
// // //         laborCategoryCode: updatedData.plc,
// // //         costRate: parseFloat(updatedData.billRate) * 0.65,
// // //         billingRate: parseFloat(updatedData.billRate),
// // //         effectiveDate: updatedData.startDate,
// // //         endDate: updatedData.endDate || null,
// // //         rateType: updatedData.rateType,
// // //         isActive: true,
// // //         modifiedBy: "admin",
// // //         createdAt: new Date().toISOString(),
// // //         updatedAt: new Date().toISOString(),
// // //       });
// // //       const fetchResponse = await axios.get(`https://test-api-3tmq.onrender.com/api/ProjectPlcRates`);
// // //       const filteredData = fetchResponse.data.filter(item =>
// // //         item.projId.toLowerCase().startsWith(selectedProjectId.toLowerCase())
// // //       );
// // //       setBillingRatesSchedule(filteredData.map(item => ({
// // //         id: item.id,
// // //         plc: item.laborCategoryCode,
// // //         billRate: item.billingRate,
// // //         rateType: item.rateType || 'Select',
// // //         startDate: item.effectiveDate.split('T')[0],
// // //         endDate: item.endDate ? item.endDate.split('T')[0] : null,
// // //       })));
// // //       setEditBillRate(prev => ({ ...prev, [id]: updatedData.billRate }));
// // //     } catch (error) {
// // //       console.error('Error updating billing rate:', error);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleDelete = async (id) => {
// // //     setLoading(true);
// // //     try {
// // //       await axios.delete(`https://test-api-3tmq.onrender.com/api/ProjectPlcRates/${id}`);
// // //       const response = await axios.get(`https://test-api-3tmq.onrender.com/api/ProjectPlcRates`);
// // //       const filteredData = response.data.filter(item =>
// // //         item.projId.toLowerCase().startsWith(selectedProjectId.toLowerCase())
// // //       );
// // //       setBillingRatesSchedule(filteredData.map(item => ({
// // //         id: item.id,
// // //         plc: item.laborCategoryCode,
// // //         billRate: item.billingRate,
// // //         rateType: item.rateType || 'Select',
// // //         startDate: item.effectiveDate.split('T')[0],
// // //         endDate: item.endDate ? item.endDate.split('T')[0] : null,
// // //       })));
// // //       setEditBillRate(prev => {
// // //         const newEditBillRate = { ...prev };
// // //         delete newEditBillRate[id];
// // //         return newEditBillRate;
// // //       });
// // //     } catch (error) {
// // //       console.error('Error deleting billing rate:', error);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleAddRow = () => {
// // //     setNewRate({ plc: '', billRate: '', rateType: 'Select', startDate: '', endDate: '' });
// // //   };

// // //   const handleSaveNewRate = async () => {
// // //     if (!newRate || !newRate.plc || !newRate.startDate || !newRate.billRate) {
// // //       console.error('Please fill all required fields (PLC, Bill Rate, Start Date)');
// // //       return;
// // //     }
// // //     setLoading(true);
// // //     try {
// // //       await axios.post(`https://test-api-3tmq.onrender.com/api/ProjectPlcRates`, {
// // //         id: 0,
// // //         projId: selectedProjectId,
// // //         laborCategoryCode: newRate.plc,
// // //         costRate: parseFloat(newRate.billRate) * 0.65,
// // //         billingRate: parseFloat(newRate.billRate),
// // //         effectiveDate: newRate.startDate,
// // //         endDate: newRate.endDate || null,
// // //         rateType: newRate.rateType,
// // //         isActive: true,
// // //         modifiedBy: "admin",
// // //         createdAt: new Date().toISOString(),
// // //         updatedAt: new Date().toISOString(),
// // //       });
// // //       setNewRate(null);
// // //       const fetchResponse = await axios.get(`https://test-api-3tmq.onrender.com/api/ProjectPlcRates`);
// // //       const filteredData = fetchResponse.data.filter(item =>
// // //         item.projId.toLowerCase().startsWith(selectedProjectId.toLowerCase())
// // //       );
// // //       setBillingRatesSchedule(filteredData.map(item => ({
// // //         id: item.id,
// // //         plc: item.laborCategoryCode,
// // //         billRate: item.billingRate,
// // //         rateType: item.rateType || 'Select',
// // //         startDate: item.effectiveDate.split('T')[0],
// // //         endDate: item.endDate ? item.endDate.split('T')[0] : null,
// // //       })));
// // //     } catch (error) {
// // //       console.error('Error adding billing rate:', error.response ? error.response.data : error.message);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleNewRateChange = (field, value) => {
// // //     setNewRate(prev => ({ ...prev, [field]: value }));
// // //   };

// // //   const handleBillRateChange = (id, value) => {
// // //     setEditBillRate(prev => ({ ...prev, [id]: value }));
// // //   };

// // //   // Employee Billing Rates Handlers
// // //   const handleAddEmployeeRow = () => {
// // //     setNewEmployeeRate({ lookupType: 'Select', empId: '', employeeName: '', plc: '', billRate: '', rateType: 'Select', startDate: '', endDate: '' });
// // //   };

// // //   const handleSaveNewEmployeeRate = async () => {
// // //     if (!newEmployeeRate || !newEmployeeRate.empId || !newEmployeeRate.plc || !newEmployeeRate.startDate || !newEmployeeRate.billRate) {
// // //       console.error('Please fill all required fields (Employee, PLC, Bill Rate, Start Date)');
// // //       return;
// // //     }
// // //     setLoading(true);
// // //     try {
// // //       await axios.post(`https://test-api-3tmq.onrender.com/ProjEmplRt`, {
// // //         id: 0,
// // //         projId: selectedProjectId,
// // //         emplId: newEmployeeRate.empId,
// // //         employeeName: newEmployeeRate.employeeName,
// // //         BillLabCatCd: newEmployeeRate.plc,
// // //         costRate: parseFloat(newEmployeeRate.billRate) * 0.65,
// // //         billingRate: parseFloat(newEmployeeRate.billRate),
// // //         effectiveDate: newEmployeeRate.startDate,
// // //         endDate: newEmployeeRate.endDate || null,
// // //         rateType: newEmployeeRate.rateType,
// // //         lookupType: newEmployeeRate.lookupType,
// // //         isActive: true,
// // //         modifiedBy: "admin",
// // //         createdAt: new Date().toISOString(),
// // //         updatedAt: new Date().toISOString(),
// // //       });
// // //       setNewEmployeeRate(null);
// // //       const fetchResponse = await axios.get(`https://test-api-3tmq.onrender.com/ProjEmplRt`);
// // //       const filteredData = fetchResponse.data.filter(item =>
// // //         item.projId.toLowerCase().startsWith(selectedProjectId.toLowerCase()) &&
// // //         item.emplId
// // //       );
// // //       setEmployeeBillingRates(filteredData.map(item => ({
// // //         id: item.id,
// // //         lookupType: item.lookupType || 'Select',
// // //         empId: item.emplId,
// // //         employeeName: item.employeeName || employees.find(emp => emp.empId === item.emplId)?.employeeName || '',
// // //         plc: item.laborCategoryCode,
// // //         plcDescription: item.description || '',
// // //         billRate: item.billingRate,
// // //         rateType: item.rateType || 'Select',
// // //         startDate: item.effectiveDate.split('T')[0],
// // //         endDate: item.endDate ? item.endDate.split('T')[0] : null,
// // //       })));
// // //     } catch (error) {
// // //       console.error('Error adding employee billing rate:', error.response ? error.response.data : error.message);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleEmployeeBillRateChange = (id, value) => {
// // //     setEditEmployeeBillRate(prev => ({ ...prev, [id]: value }));
// // //   };

// // //   const handleUpdateEmployee = async (id, updatedData) => {
// // //     setLoading(true);
// // //     try {
// // //       await axios.put(`https://test-api-3tmq.onrender.com/ProjEmplRt/${id}`, {
// // //         id,
// // //         projId: selectedProjectId,
// // //         emplId: updatedData.empId,
// // //         employeeName: updatedData.employeeName,
// // //         laborCategoryCode: updatedData.plc,
// // //         costRate: parseFloat(updatedData.billRate) * 0.65,
// // //         billingRate: parseFloat(updatedData.billRate),
// // //         effectiveDate: updatedData.startDate,
// // //         endDate: updatedData.endDate || null,
// // //         rateType: updatedData.rateType,
// // //         lookupType: updatedData.lookupType,
// // //         isActive: true,
// // //         modifiedBy: "admin",
// // //         createdAt: new Date().toISOString(),
// // //         updatedAt: new Date().toISOString(),
// // //       });
// // //       const fetchResponse = await axios.get(`https://test-api-3tmq.onrender.com/ProjEmplRt`);
// // //       const filteredData = fetchResponse.data.filter(item =>
// // //         item.projId.toLowerCase().startsWith(selectedProjectId.toLowerCase()) &&
// // //         item.emplId
// // //       );
// // //       setEmployeeBillingRates(filteredData.map(item => ({
// // //         id: item.id,
// // //         lookupType: item.lookupType || 'Select',
// // //         empId: item.emplId,
// // //         employeeName: item.employeeName || employees.find(emp => emp.empId === item.emplId)?.employeeName || '',
// // //         plc: item.laborCategoryCode,
// // //         plcDescription: item.description || '',
// // //         billRate: item.billingRate,
// // //         rateType: item.rateType || 'Select',
// // //         startDate: item.effectiveDate.split('T')[0],
// // //         endDate: item.endDate ? item.endDate.split('T')[0] : null,
// // //       })));
// // //       setEditEmployeeBillRate(prev => ({ ...prev, [id]: updatedData.billRate }));
// // //     } catch (error) {
// // //       console.error('Error updating employee billing rate:', error);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleDeleteEmployee = async (id) => {
// // //     setLoading(true);
// // //     try {
// // //       await axios.delete(`https://test-api-3tmq.onrender.com/ProjEmplRt/${id}`);
// // //       const response = await axios.get(`https://test-api-3tmq.onrender.com/ProjEmplRt`);
// // //       const filteredData = response.data.filter(item =>
// // //         item.projId.toLowerCase().startsWith(selectedProjectId.toLowerCase()) &&
// // //         item.emplId
// // //       );
// // //       setEmployeeBillingRates(filteredData.map(item => ({
// // //         id: item.id,
// // //         lookupType: item.lookupType || 'Select',
// // //         empId: item.emplId,
// // //         employeeName: item.employeeName || employees.find(emp => emp.empId === item.emplId)?.employeeName || '',
// // //         plc: item.laborCategoryCode,
// // //         plcDescription: item.description || '',
// // //         billRate: item.billingRate,
// // //         rateType: item.rateType || 'Select',
// // //         startDate: item.effectiveDate.split('T')[0],
// // //         endDate: item.endDate ? item.endDate.split('T')[0] : null,
// // //       })));
// // //       setEditEmployeeBillRate(prev => {
// // //         const newEditEmployeeBillRate = { ...prev };
// // //         delete newEditEmployeeBillRate[id];
// // //         return newEditEmployeeBillRate;
// // //       });
// // //     } catch (error) {
// // //       console.error('Error deleting employee billing rate:', error);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleNewEmployeeRateChange = (field, value, id = null) => {
// // //     if (id) {
// // //       // Update existing row
// // //       const selectedEmp = field === 'empId' ? employees.find(emp => emp.empId === value) : null;
// // //       setEmployeeBillingRates(prev => prev.map(rate =>
// // //         rate.id === id
// // //           ? {
// // //               ...rate,
// // //               [field]: value,
// // //               ...(field === 'empId' && selectedEmp ? { employeeName: selectedEmp.employeeName } : {})
// // //             }
// // //           : rate
// // //       ));
// // //     } else {
// // //       // Update new row
// // //       const selectedEmp = field === 'empId' ? employees.find(emp => emp.empId === value) : null;
// // //       setNewEmployeeRate(prev => ({
// // //         ...prev,
// // //         [field]: value,
// // //         ...(field === 'empId' && selectedEmp ? { employeeName: selectedEmp.employeeName } : {})
// // //       }));
// // //     }
// // //   };

// // //   // Vendor Billing Rates Handlers
// // //   const handleAddVendorRow = () => {
// // //     setNewVendorRate({ lookupType: 'Select', vendorId: '', vendorEmployee: '', plc: '', billRate: '', rateType: 'Select', startDate: '', endDate: '' });
// // //   };

// // //   const handleSaveNewVendorRate = async () => {
// // //     if (!newVendorRate || !newVendorRate.vendorId || !newVendorRate.plc || !newVendorRate.startDate || !newVendorRate.billRate) {
// // //       console.error('Please fill all required fields (Vendor, PLC, Bill Rate, Start Date)');
// // //       return;
// // //     }
// // //     setLoading(true);
// // //     try {
// // //       await axios.post(`https://test-api-3tmq.onrender.com/api/ProjectPlcRates`, {
// // //         id: 0,
// // //         projId: selectedProjectId,
// // //         vendorId: newVendorRate.vendorId,
// // //         vendorEmployee: newVendorRate.vendorEmployee,
// // //         laborCategoryCode: newVendorRate.plc,
// // //         costRate: parseFloat(newVendorRate.billRate) * 0.65,
// // //         billingRate: parseFloat(newVendorRate.billRate),
// // //         effectiveDate: newVendorRate.startDate,
// // //         endDate: newVendorRate.endDate || null,
// // //         rateType: newVendorRate.rateType,
// // //         lookupType: newVendorRate.lookupType,
// // //         isActive: true,
// // //         modifiedBy: "admin",
// // //         createdAt: new Date().toISOString(),
// // //         updatedAt: new Date().toISOString(),
// // //       });
// // //       setNewVendorRate(null);
// // //       const fetchResponse = await axios.get(`https://test-api-3tmq.onrender.com/api/ProjectPlcRates`);
// // //       const filteredData = fetchResponse.data.filter(item =>
// // //         item.projId.toLowerCase().startsWith(selectedProjectId.toLowerCase()) &&
// // //         item.vendorId
// // //       );
// // //       setVendorBillingRates(filteredData.map(item => ({
// // //         id: item.id,
// // //         lookupType: item.lookupType || 'Select',
// // //         vendorId: item.vendorId,
// // //         vendorName: item.vendorName || '',
// // //         vendorEmployee: item.vendorEmployee || '',
// // //         vendorEmployeeName: item.vendorEmployeeName || '',
// // //         plc: item.laborCategoryCode,
// // //         plcDescription: item.description || '',
// // //         billRate: item.billingRate,
// // //         rateType: item.rateType || 'Select',
// // //         startDate: item.effectiveDate.split('T')[0],
// // //         endDate: item.endDate ? item.endDate.split('T')[0] : null,
// // //       })));
// // //     } catch (error) {
// // //       console.error('Error adding vendor billing rate:', error.response ? error.response.data : error.message);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleVendorBillRateChange = (id, value) => {
// // //     setEditVendorBillRate(prev => ({ ...prev, [id]: value }));
// // //   };

// // //   const handleUpdateVendor = async (id, updatedData) => {
// // //     setLoading(true);
// // //     try {
// // //       await axios.put(`https://test-api-3tmq.onrender.com/api/ProjectPlcRates/${id}`, {
// // //         id,
// // //         projId: selectedProjectId,
// // //         vendorId: updatedData.vendorId,
// // //         vendorEmployee: updatedData.vendorEmployee,
// // //         laborCategoryCode: updatedData.plc,
// // //         costRate: parseFloat(updatedData.billRate) * 0.65,
// // //         billingRate: parseFloat(updatedData.billRate),
// // //         effectiveDate: updatedData.startDate,
// // //         endDate: updatedData.endDate || null,
// // //         rateType: updatedData.rateType,
// // //         lookupType: updatedData.lookupType,
// // //         isActive: true,
// // //         modifiedBy: "admin",
// // //         createdAt: new Date().toISOString(),
// // //         updatedAt: new Date().toISOString(),
// // //       });
// // //       const fetchResponse = await axios.get(`https://test-api-3tmq.onrender.com/api/ProjectPlcRates`);
// // //       const filteredData = fetchResponse.data.filter(item =>
// // //         item.projId.toLowerCase().startsWith(selectedProjectId.toLowerCase()) &&
// // //         item.vendorId
// // //       );
// // //       setVendorBillingRates(filteredData.map(item => ({
// // //         id: item.id,
// // //         lookupType: item.lookupType || 'Select',
// // //         vendorId: item.vendorId,
// // //         vendorName: item.vendorName || '',
// // //         vendorEmployee: item.vendorEmployee || '',
// // //         vendorEmployeeName: item.vendorEmployeeName || '',
// // //         plc: item.laborCategoryCode,
// // //         plcDescription: item.description || '',
// // //         billRate: item.billingRate,
// // //         rateType: item.rateType || 'Select',
// // //         startDate: item.effectiveDate.split('T')[0],
// // //         endDate: item.endDate ? item.endDate.split('T')[0] : null,
// // //       })));
// // //       setEditVendorBillRate(prev => ({ ...prev, [id]: updatedData.billRate }));
// // //     } catch (error) {
// // //       console.error('Error updating vendor billing rate:', error);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleDeleteVendor = async (id) => {
// // //     setLoading(true);
// // //     try {
// // //       await axios.delete(`https://test-api-3tmq.onrender.com/api/ProjectPlcRates/${id}`);
// // //       const response = await axios.get(`https://test-api-3tmq.onrender.com/api/ProjectPlcRates`);
// // //       const filteredData = response.data.filter(item =>
// // //         item.projId.toLowerCase().startsWith(selectedProjectId.toLowerCase()) &&
// // //         item.vendorId
// // //       );
// // //       setVendorBillingRates(filteredData.map(item => ({
// // //         id: item.id,
// // //         lookupType: item.lookupType || 'Select',
// // //         vendorId: item.vendorId,
// // //         vendorName: item.vendorName || '',
// // //         vendorEmployee: item.vendorEmployee || '',
// // //         vendorEmployeeName: item.vendorEmployeeName || '',
// // //         plc: item.laborCategoryCode,
// // //         plcDescription: item.description || '',
// // //         billRate: item.billingRate,
// // //         rateType: item.rateType || 'Select',
// // //         startDate: item.effectiveDate.split('T')[0],
// // //         endDate: item.endDate ? item.endDate.split('T')[0] : null,
// // //       })));
// // //       setEditVendorBillRate(prev => {
// // //         const newEditVendorBillRate = { ...prev };
// // //         delete newEditVendorBillRate[id];
// // //         return newEditVendorBillRate;
// // //       });
// // //     } catch (error) {
// // //       console.error('Error deleting vendor billing rate:', error);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleNewVendorRateChange = (field, value) => {
// // //     setNewVendorRate(prev => ({ ...prev, [field]: value }));
// // //   };

// // //   return (
// // //     <div className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16 text-xs">
// // //       <div className="mb-4">
// // //         <h3 className="text-xs font-normal">Project Labor Categories Billing Rates Schedule</h3>
// // //         <div className="overflow-x-auto">
// // //           <table className="w-full text-xs border-collapse">
// // //             <thead>
// // //               <tr className="bg-gray-100">
// // //                 <th className="border p-1 font-normal">Plc</th>
// // //                 <th className="border p-1 font-normal">Bill Rate</th>
// // //                 <th className="border p-1 font-normal">Rate Type</th>
// // //                 <th className="border p-1 font-normal">Start Date</th>
// // //                 <th className="border p-1 font-normal">End Date</th>
// // //                 <th className="border p-1 font-normal">Actions</th>
// // //               </tr>
// // //             </thead>
// // //             <tbody>
// // //               {loading ? (
// // //                 <tr><td colSpan="6" className="border p-1 text-center">Loading...</td></tr>
// // //               ) : billingRatesSchedule.length === 0 ? (
// // //                 <tr><td colSpan="6" className="border p-1 text-center">No data available</td></tr>
// // //               ) : (
// // //                 billingRatesSchedule.map((item) => (
// // //                   <tr key={item.id} className="sm:table-row flex flex-col sm:flex-row mb-1 sm:mb-0">
// // //                     <td className="border p-1 sm:w-1/6">
// // //                       <input
// // //                         type="text"
// // //                         value={item.plc}
// // //                         onChange={(e) => {
// // //                           handleNewRateChange('plc', e.target.value);
// // //                           setPlcSearch(e.target.value);
// // //                         }}
// // //                         className="w-full p-1 border rounded text-xs"
// // //                         list="plc-list"
// // //                       />
// // //                       <datalist id="plc-list">
// // //                         {plcs.map(plc => (
// // //                           <option key={plc.laborCategoryCode} value={plc.laborCategoryCode}>
// // //                             {plc.description}
// // //                           </option>
// // //                         ))}
// // //                       </datalist>
// // //                     </td>
// // //                     <td className="border p-1 sm:w-1/6">
// // //                       <input
// // //                         type="text"
// // //                         value={editBillRate[item.id] || item.billRate}
// // //                         onChange={(e) => handleBillRateChange(item.id, e.target.value)}
// // //                         className="w-full p-1 border rounded text-xs"
// // //                       />
// // //                     </td>
// // //                     <td className="border p-1 sm:w-1/6">
// // //                       <select
// // //                         value={item.rateType}
// // //                         onChange={(e) => handleNewRateChange('rateType', e.target.value)}
// // //                         className="w-full p-1 border rounded text-xs"
// // //                       >
// // //                         {rateTypeOptions.map(option => (
// // //                           <option key={option} value={option}>{option}</option>
// // //                         ))}
// // //                       </select>
// // //                     </td>
// // //                     <td className="border p-1 sm:w-1/6">
// // //                       <input
// // //                         type="date"
// // //                         value={item.startDate}
// // //                         onChange={(e) => handleNewRateChange('startDate', e.target.value)}
// // //                         className="w-full p-1 border rounded text-xs"
// // //                       />
// // //                     </td>
// // //                     <td className="border p-1 sm:w-1/6">
// // //                       <input
// // //                         type="date"
// // //                         value={item.endDate || ''}
// // //                         onChange={(e) => handleNewRateChange('endDate', e.target.value)}
// // //                         className="w-full p-1 border rounded text-xs"
// // //                       />
// // //                     </td>
// // //                     <td className="border p-1 sm:w-1/6">
// // //                       <div className="flex flex-col sm:flex-row justify-center space-y-1 sm:space-y-0 sm:space-x-1">
// // //                         <button
// // //                           onClick={() => handleUpdate(item.id, { ...item, billRate: editBillRate[item.id] || item.billRate })}
// // //                           className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-yellow-600 transition w-full sm:w-auto"
// // //                           disabled={loading}
// // //                         >
// // //                           Update
// // //                         </button>
// // //                         <button
// // //                           onClick={() => handleDelete(item.id)}
// // //                           className="bg-red-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-red-600 transition w-full sm:w-auto"
// // //                           disabled={loading}
// // //                         >
// // //                           Delete
// // //                         </button>
// // //                       </div>
// // //                     </td>
// // //                   </tr>
// // //                 ))
// // //               )}
// // //               {newRate && (
// // //                 <tr className="sm:table-row flex flex-col sm:flex-row mb-1 sm:mb-0">
// // //                   <td className="border p-1 sm:w-1/6">
// // //                     <input
// // //                       type="text"
// // //                       value={newRate.plc || ''}
// // //                       onChange={(e) => {
// // //                         handleNewRateChange('plc', e.target.value);
// // //                         setPlcSearch(e.target.value);
// // //                       }}
// // //                       className="w-full p-1 border rounded text-xs"
// // //                       list="plc-list"
// // //                     />
// // //                     <datalist id="plc-list">
// // //                       {plcs.map(plc => (
// // //                         <option key={plc.laborCategoryCode} value={plc.laborCategoryCode}>
// // //                           {plc.description}
// // //                         </option>
// // //                       ))}
// // //                     </datalist>
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/6">
// // //                     <input
// // //                       type="text"
// // //                       value={newRate.billRate || ''}
// // //                       onChange={(e) => handleNewRateChange('billRate', e.target.value)}
// // //                       className="w-full p-1 border rounded text-xs"
// // //                     />
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/6">
// // //                     <select
// // //                       value={newRate.rateType}
// // //                       onChange={(e) => handleNewRateChange('rateType', e.target.value)}
// // //                       className="w-full p-1 border rounded text-xs"
// // //                     >
// // //                       {rateTypeOptions.map(option => (
// // //                         <option key={option} value={option}>{option}</option>
// // //                       ))}
// // //                     </select>
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/6">
// // //                     <input
// // //                       type="date"
// // //                       value={newRate.startDate || ''}
// // //                       onChange={(e) => handleNewRateChange('startDate', e.target.value)}
// // //                       className="w-full p-1 border rounded text-xs"
// // //                     />
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/6">
// // //                     <input
// // //                       type="date"
// // //                       value={newRate.endDate || ''}
// // //                       onChange={(e) => handleNewRateChange('endDate', e.target.value)}
// // //                       className="w-full p-1 border rounded text-xs"
// // //                     />
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/6">
// // //                     <div className="flex flex-col sm:flex-row justify-center space-y-1 sm:space-y-0 sm:space-x-1">
// // //                       <button
// // //                         onClick={handleSaveNewRate}
// // //                         className="bg-green-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-green-600 transition w-full sm:w-auto"
// // //                         disabled={loading}
// // //                       >
// // //                         Save
// // //                       </button>
// // //                       <button
// // //                         onClick={() => setNewRate(null)}
// // //                         className="bg-gray-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-gray-600 transition w-full sm:w-auto"
// // //                         disabled={loading}
// // //                       >
// // //                         Cancel
// // //                       </button>
// // //                     </div>
// // //                   </td>
// // //                 </tr>
// // //               )}
// // //               <tr>
// // //                 <td colSpan="6" className="border p-1">
// // //                   <button
// // //                     onClick={handleAddRow}
// // //                     className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-blue-600 transition"
// // //                     disabled={loading || newRate}
// // //                   >
// // //                     Add
// // //                   </button>
// // //                 </td>
// // //               </tr>
// // //             </tbody>
// // //           </table>
// // //         </div>
// // //       </div>

// // //       <div className="mb-4">
// // //         <h3 className="text-xs font-normal">Employee Billing Rates Schedule</h3>
// // //         <div className="overflow-x-auto">
// // //           <table className="w-full text-xs border-collapse">
// // //             <thead>
// // //               <tr className="bg-gray-100">
// // //                 <th className="border p-1 font-normal">Lookup Type</th>
// // //                 <th className="border p-1 font-normal">Employee</th>
// // //                 <th className="border p-1 font-normal">Employee Name</th>
// // //                 <th className="border p-1 font-normal">PLC</th>
// // //                 <th className="border p-1 font-normal">PLC Description</th>
// // //                 <th className="border p-1 font-normal">Bill Rate</th>
// // //                 <th className="border p-1 font-normal">Rate Type</th>
// // //                 <th className="border p-1 font-normal">Start Date</th>
// // //                 <th className="border p-1 font-normal">End Date</th>
// // //                 <th className="border p-1 font-normal">Actions</th>
// // //               </tr>
// // //             </thead>
// // //             <tbody>
// // //               {loading ? (
// // //                 <tr><td colSpan="10" className="border p-1 text-center">Loading...</td></tr>
// // //               ) : employeeBillingRates.length === 0 && !newEmployeeRate ? (
// // //                 <tr><td colSpan="10" className="border p-1 text-center">No data available</td></tr>
// // //               ) : (
// // //                 employeeBillingRates.map((item) => (
// // //                   <tr key={item.id} className="sm:table-row flex flex-col sm:flex-row mb-1 sm:mb-0">
// // //                     <td className="border p-1 sm:w-1/10">
// // //                       <select
// // //                         value={item.lookupType}
// // //                         onChange={(e) => handleNewEmployeeRateChange('lookupType', e.target.value, item.id)}
// // //                         className="w-full p-1 border rounded text-xs"
// // //                       >
// // //                         {lookupTypeOptions.map(option => (
// // //                           <option key={option} value={option}>{option}</option>
// // //                         ))}
// // //                       </select>
// // //                     </td>
// // //                     <td className="border p-1 sm:w-1/10">
// // //                       <select
// // //                         value={item.empId}
// // //                         onChange={(e) => handleNewEmployeeRateChange('empId', e.target.value, item.id)}
// // //                         className="w-full p-1 border rounded text-xs"
// // //                         disabled={employees.length === 0}
// // //                       >
// // //                         <option value="">Select Employee</option>
// // //                         {employees.map(emp => (
// // //                           <option key={emp.empId} value={emp.empId}>
// // //                             {emp.empId}
// // //                           </option>
// // //                         ))}
// // //                       </select>
// // //                     </td>
// // //                     <td className="border p-1 sm:w-1/10">
// // //                       {item.employeeName}
// // //                     </td>
// // //                     <td className="border p-1 sm:w-1/10">
// // //                       <input
// // //                         type="text"
// // //                         value={item.plc}
// // //                         onChange={(e) => {
// // //                           handleNewEmployeeRateChange('plc', e.target.value, item.id);
// // //                           setPlcSearch(e.target.value);
// // //                         }}
// // //                         className="w-full p-1 border rounded text-xs"
// // //                         list="plc-list"
// // //                       />
// // //                       <datalist id="plc-list">
// // //                         {plcs.map(plc => (
// // //                           <option key={plc.laborCategoryCode} value={plc.laborCategoryCode}>
// // //                             {plc.description}
// // //                           </option>
// // //                         ))}
// // //                       </datalist>
// // //                     </td>
// // //                     <td className="border p-1 sm:w-1/10">
// // //                       {plcs.find(plc => plc.laborCategoryCode === item.plc)?.description || item.plcDescription}
// // //                     </td>
// // //                     <td className="border p-1 sm:w-1/10">
// // //                       <input
// // //                         type="text"
// // //                         value={editEmployeeBillRate[item.id] || item.billRate}
// // //                         onChange={(e) => handleEmployeeBillRateChange(item.id, e.target.value)}
// // //                         className="w-full p-1 border rounded text-xs"
// // //                       />
// // //                     </td>
// // //                     <td className="border p-1 sm:w-1/10">
// // //                       <select
// // //                         value={item.rateType}
// // //                         onChange={(e) => handleNewEmployeeRateChange('rateType', e.target.value, item.id)}
// // //                         className="w-full p-1 border rounded text-xs"
// // //                       >
// // //                         {rateTypeOptions.map(option => (
// // //                           <option key={option} value={option}>{option}</option>
// // //                         ))}
// // //                       </select>
// // //                     </td>
// // //                     <td className="border p-1 sm:w-1/10">
// // //                       <input
// // //                         type="date"
// // //                         value={item.startDate}
// // //                         onChange={(e) => handleNewEmployeeRateChange('startDate', e.target.value, item.id)}
// // //                         className="w-full p-1 border rounded text-xs"
// // //                       />
// // //                     </td>
// // //                     <td className="border p-1 sm:w-1/10">
// // //                       <input
// // //                         type="date"
// // //                         value={item.endDate || ''}
// // //                         onChange={(e) => handleNewEmployeeRateChange('endDate', e.target.value, item.id)}
// // //                         className="w-full p-1 border rounded text-xs"
// // //                       />
// // //                     </td>
// // //                     <td className="border p-1 sm:w-1/10">
// // //                       <div className="flex flex-col sm:flex-row justify-center space-y-1 sm:space-y-0 sm:space-x-1">
// // //                         <button
// // //                           onClick={() => handleUpdateEmployee(item.id, { ...item, billRate: editEmployeeBillRate[item.id] || item.billRate })}
// // //                           className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-yellow-600 transition w-full sm:w-auto"
// // //                           disabled={loading}
// // //                         >
// // //                           Update
// // //                         </button>
// // //                         <button
// // //                           onClick={() => handleDeleteEmployee(item.id)}
// // //                           className="bg-red-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-red-600 transition w-full sm:w-auto"
// // //                           disabled={loading}
// // //                         >
// // //                           Delete
// // //                         </button>
// // //                       </div>
// // //                     </td>
// // //                   </tr>
// // //                 ))
// // //               )}
// // //               {newEmployeeRate && (
// // //                 <tr className="sm:table-row flex flex-col sm:flex-row mb-1 sm:mb-0">
// // //                   <td className="border p-1 sm:w-1/10">
// // //                     <select
// // //                       value={newEmployeeRate.lookupType}
// // //                       onChange={(e) => handleNewEmployeeRateChange('lookupType', e.target.value)}
// // //                       className="w-full p-1 border rounded text-xs"
// // //                     >
// // //                       {lookupTypeOptions.map(option => (
// // //                         <option key={option} value={option}>{option}</option>
// // //                       ))}
// // //                     </select>
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/10">
// // //                     <select
// // //                       value={newEmployeeRate.empId || ''}
// // //                       onChange={(e) => handleNewEmployeeRateChange('empId', e.target.value)}
// // //                       className="w-full p-1 border rounded text-xs"
// // //                       disabled={employees.length === 0}
// // //                     >
// // //                       <option value="">Select Employee</option>
// // //                       {employees.map(emp => (
// // //                         <option key={emp.empId} value={emp.empId}>
// // //                           {emp.empId}
// // //                         </option>
// // //                       ))}
// // //                     </select>
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/10">
// // //                     {newEmployeeRate.employeeName || ''}
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/10">
// // //                     <input
// // //                       type="text"
// // //                       value={newEmployeeRate.plc || ''}
// // //                       onChange={(e) => {
// // //                         handleNewEmployeeRateChange('plc', e.target.value);
// // //                         setPlcSearch(e.target.value);
// // //                       }}
// // //                       className="w-full p-1 border rounded text-xs"
// // //                       list="plc-list"
// // //                     />
// // //                     <datalist id="plc-list">
// // //                       {plcs.map(plc => (
// // //                         <option key={plc.laborCategoryCode} value={plc.laborCategoryCode}>
// // //                           {plc.description}
// // //                         </option>
// // //                       ))}
// // //                     </datalist>
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/10">
// // //                     {plcs.find(plc => plc.laborCategoryCode === newEmployeeRate.plc)?.description || ''}
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/10">
// // //                     <input
// // //                       type="text"
// // //                       value={newEmployeeRate.billRate || ''}
// // //                       onChange={(e) => handleNewEmployeeRateChange('billRate', e.target.value)}
// // //                       className="w-full p-1 border rounded text-xs"
// // //                     />
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/10">
// // //                     <select
// // //                       value={newEmployeeRate.rateType}
// // //                       onChange={(e) => handleNewEmployeeRateChange('rateType', e.target.value)}
// // //                       className="w-full p-1 border rounded text-xs"
// // //                     >
// // //                       {rateTypeOptions.map(option => (
// // //                         <option key={option} value={option}>{option}</option>
// // //                       ))}
// // //                     </select>
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/10">
// // //                     <input
// // //                       type="date"
// // //                       value={newEmployeeRate.startDate || ''}
// // //                       onChange={(e) => handleNewEmployeeRateChange('startDate', e.target.value)}
// // //                       className="w-full p-1 border rounded text-xs"
// // //                     />
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/10">
// // //                     <input
// // //                       type="date"
// // //                       value={newEmployeeRate.endDate || ''}
// // //                       onChange={(e) => handleNewEmployeeRateChange('endDate', e.target.value)}
// // //                       className="w-full p-1 border rounded text-xs"
// // //                     />
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/10">
// // //                     <div className="flex flex-col sm:flex-row justify-center space-y-1 sm:space-y-0 sm:space-x-1">
// // //                       <button
// // //                         onClick={handleSaveNewEmployeeRate}
// // //                         className="bg-green-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-green-600 transition w-full sm:w-auto"
// // //                         disabled={loading}
// // //                       >
// // //                         Save
// // //                       </button>
// // //                       <button
// // //                         onClick={() => setNewEmployeeRate(null)}
// // //                         className="bg-gray-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-gray-600 transition w-full sm:w-auto"
// // //                         disabled={loading}
// // //                       >
// // //                         Cancel
// // //                       </button>
// // //                     </div>
// // //                   </td>
// // //                 </tr>
// // //               )}
// // //               <tr>
// // //                 <td colSpan="10" className="border p-1">
// // //                   <button
// // //                     onClick={handleAddEmployeeRow}
// // //                     className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-blue-600 transition"
// // //                     disabled={loading || newEmployeeRate}
// // //                   >
// // //                     Add
// // //                   </button>
// // //                 </td>
// // //               </tr>
// // //             </tbody>
// // //           </table>
// // //         </div>
// // //       </div>

// // //       <div className="mb-4">
// // //         <h3 className="text-xs font-normal">Vendor Billing Rates Schedule</h3>
// // //         <div className="overflow-x-auto">
// // //           <table className="w-full text-xs border-collapse">
// // //             <thead>
// // //               <tr className="bg-gray-100">
// // //                 <th className="border p-1 font-normal">Lookup Type</th>
// // //                 <th className="border p-1 font-normal">Vendor</th>
// // //                 <th className="border p-1 font-normal">Vendor Name</th>
// // //                 <th className="border p-1 font-normal">Vendor Employee</th>
// // //                 <th className="border p-1 font-normal">Vendor Employee Name</th>
// // //                 <th className="border p-1 font-normal">PLC</th>
// // //                 <th className="border p-1 font-normal">PLC Description</th>
// // //                 <th className="border p-1 font-normal">Bill Rate</th>
// // //                 <th className="border p-1 font-normal">Rate Type</th>
// // //                 <th className="border p-1 font-normal">Start Date</th>
// // //                 <th className="border p-1 font-normal">End Date</th>
// // //                 <th className="border p-1 font-normal">Actions</th>
// // //               </tr>
// // //             </thead>
// // //             <tbody>
// // //               {loading ? (
// // //                 <tr><td colSpan="12" className="border p-1 text-center">Loading...</td></tr>
// // //               ) : vendorBillingRates.length === 0 ? (
// // //                 <tr><td colSpan="12" className="border p-1 text-center">No data available</td></tr>
// // //               ) : (
// // //                 vendorBillingRates.map((item) => (
// // //                   <tr key={item.id} className="sm:table-row flex flex-col sm:flex-row mb-1 sm:mb-0">
// // //                     <td className="border p-1 sm:w-1/12">
// // //                       <select
// // //                         value={item.lookupType}
// // //                         onChange={(e) => handleNewVendorRateChange('lookupType', e.target.value)}
// // //                         className="w-full p-1 border rounded text-xs"
// // //                       >
// // //                         {lookupTypeOptions.map(option => (
// // //                           <option key={option} value={option}>{option}</option>
// // //                         ))}
// // //                       </select>
// // //                     </td>
// // //                     <td className="border p-1 sm:w-1/12">{item.vendorId}</td>
// // //                     <td className="border p-1 sm:w-1/12">{item.vendorName}</td>
// // //                     <td className="border p-1 sm:w-1/12">{item.vendorEmployee}</td>
// // //                     <td className="border p-1 sm:w-1/12">{item.vendorEmployeeName}</td>
// // //                     <td className="border p-1 sm:w-1/12">
// // //                       <input
// // //                         type="text"
// // //                         value={item.plc}
// // //                         onChange={(e) => {
// // //                           setVendorBillingRates(prev => prev.map(rate =>
// // //                             rate.id === item.id
// // //                               ? { ...rate, plc: e.target.value }
// // //                               : rate
// // //                           ));
// // //                           setPlcSearch(e.target.value);
// // //                         }}
// // //                         className="w-full p-1 border rounded text-xs"
// // //                         list="plc-list"
// // //                       />
// // //                       <datalist id="plc-list">
// // //                         {plcs.map(plc => (
// // //                           <option key={plc.laborCategoryCode} value={plc.laborCategoryCode}>
// // //                             {plc.description}
// // //                           </option>
// // //                         ))}
// // //                       </datalist>
// // //                     </td>
// // //                     <td className="border p-1 sm:w-1/12">
// // //                       {plcs.find(plc => plc.laborCategoryCode === item.plc)?.description || item.plcDescription}
// // //                     </td>
// // //                     <td className="border p-1 sm:w-1/12">
// // //                       <input
// // //                         type="text"
// // //                         value={editVendorBillRate[item.id] || item.billRate}
// // //                         onChange={(e) => handleVendorBillRateChange(item.id, e.target.value)}
// // //                         className="w-full p-1 border rounded text-xs"
// // //                       />
// // //                     </td>
// // //                     <td className="border p-1 sm:w-1/12">
// // //                       <select
// // //                         value={item.rateType}
// // //                         onChange={(e) => setVendorBillingRates(prev => prev.map(rate =>
// // //                           rate.id === item.id
// // //                             ? { ...rate, rateType: e.target.value }
// // //                             : rate
// // //                         ))}
// // //                         className="w-full p-1 border rounded text-xs"
// // //                       >
// // //                         {rateTypeOptions.map(option => (
// // //                           <option key={option} value={option}>{option}</option>
// // //                         ))}
// // //                       </select>
// // //                     </td>
// // //                     <td className="border p-1 sm:w-1/12">
// // //                       <input
// // //                         type="date"
// // //                         value={item.startDate}
// // //                         onChange={(e) => setVendorBillingRates(prev => prev.map(rate =>
// // //                           rate.id === item.id
// // //                             ? { ...rate, startDate: e.target.value }
// // //                             : rate
// // //                         ))}
// // //                         className="w-full p-1 border rounded text-xs"
// // //                       />
// // //                     </td>
// // //                     <td className="border p-1 sm:w-1/12">
// // //                       <input
// // //                         type="date"
// // //                         value={item.endDate || ''}
// // //                         onChange={(e) => setVendorBillingRates(prev => prev.map(rate =>
// // //                           rate.id === item.id
// // //                             ? { ...rate, endDate: e.target.value }
// // //                             : rate
// // //                         ))}
// // //                         className="w-full p-1 border rounded text-xs"
// // //                       />
// // //                     </td>
// // //                     <td className="border p-1 sm:w-1/12">
// // //                       <div className="flex flex-col sm:flex-row justify-center space-y-1 sm:space-y-0 sm:space-x-1">
// // //                         <button
// // //                           onClick={() => handleUpdateVendor(item.id, { ...item, billRate: editVendorBillRate[item.id] || item.billRate })}
// // //                           className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-yellow-600 transition w-full sm:w-auto"
// // //                           disabled={loading}
// // //                         >
// // //                           Update
// // //                         </button>
// // //                         <button
// // //                           onClick={() => handleDeleteVendor(item.id)}
// // //                           className="bg-red-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-red-600 transition w-full sm:w-auto"
// // //                           disabled={loading}
// // //                         >
// // //                           Delete
// // //                         </button>
// // //                       </div>
// // //                     </td>
// // //                   </tr>
// // //                 ))
// // //               )}
// // //               {newVendorRate && (
// // //                 <tr className="sm:table-row flex flex-col sm:flex-row mb-1 sm:mb-0">
// // //                   <td className="border p-1 sm:w-1/12">
// // //                     <select
// // //                       value={newVendorRate.lookupType}
// // //                       onChange={(e) => handleNewVendorRateChange('lookupType', e.target.value)}
// // //                       className="w-full p-1 border rounded text-xs"
// // //                     >
// // //                       {lookupTypeOptions.map(option => (
// // //                         <option key={option} value={option}>{option}</option>
// // //                       ))}
// // //                     </select>
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/12">
// // //                     <input
// // //                       type="text"
// // //                       value={newVendorRate.vendorId || ''}
// // //                       onChange={(e) => handleNewVendorRateChange('vendorId', e.target.value)}
// // //                       className="w-full p-1 border rounded text-xs"
// // //                     />
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/12">
// // //                     <input
// // //                       type="text"
// // //                       value={newVendorRate.vendorName || ''}
// // //                       onChange={(e) => handleNewVendorRateChange('vendorName', e.target.value)}
// // //                       className="w-full p-1 border rounded text-xs"
// // //                     />
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/12">
// // //                     <input
// // //                       type="text"
// // //                       value={newVendorRate.vendorEmployee || ''}
// // //                       onChange={(e) => handleNewVendorRateChange('vendorEmployee', e.target.value)}
// // //                       className="w-full p-1 border rounded text-xs"
// // //                     />
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/12">
// // //                     <input
// // //                       type="text"
// // //                       value={newVendorRate.vendorEmployeeName || ''}
// // //                       onChange={(e) => handleNewVendorRateChange('vendorEmployeeName', e.target.value)}
// // //                       className="w-full p-1 border rounded text-xs"
// // //                     />
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/12">
// // //                     <input
// // //                       type="text"
// // //                       value={newVendorRate.plc || ''}
// // //                       onChange={(e) => {
// // //                         handleNewVendorRateChange('plc', e.target.value);
// // //                         setPlcSearch(e.target.value);
// // //                       }}
// // //                       className="w-full p-1 border rounded text-xs"
// // //                       list="plc-list"
// // //                     />
// // //                     <datalist id="plc-list">
// // //                       {plcs.map(plc => (
// // //                         <option key={plc.laborCategoryCode} value={plc.laborCategoryCode}>
// // //                           {plc.description}
// // //                         </option>
// // //                       ))}
// // //                     </datalist>
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/12">
// // //                     {plcs.find(plc => plc.laborCategoryCode === newVendorRate.plc)?.description || ''}
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/12">
// // //                     <input
// // //                       type="text"
// // //                       value={newVendorRate.billRate || ''}
// // //                       onChange={(e) => handleNewVendorRateChange('billRate', e.target.value)}
// // //                       className="w-full p-1 border rounded text-xs"
// // //                     />
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/12">
// // //                     <select
// // //                       value={newVendorRate.rateType}
// // //                       onChange={(e) => handleNewVendorRateChange('rateType', e.target.value)}
// // //                       className="w-full p-1 border rounded text-xs"
// // //                     >
// // //                       {rateTypeOptions.map(option => (
// // //                         <option key={option} value={option}>{option}</option>
// // //                       ))}
// // //                     </select>
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/12">
// // //                     <input
// // //                       type="date"
// // //                       value={newVendorRate.startDate || ''}
// // //                       onChange={(e) => handleNewVendorRateChange('startDate', e.target.value)}
// // //                       className="w-full p-1 border rounded text-xs"
// // //                     />
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/12">
// // //                     <input
// // //                       type="date"
// // //                       value={newVendorRate.endDate || ''}
// // //                       onChange={(e) => handleNewVendorRateChange('endDate', e.target.value)}
// // //                       className="w-full p-1 border rounded text-xs"
// // //                     />
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/12">
// // //                     <div className="flex flex-col sm:flex-row justify-center space-y-1 sm:space-y-0 sm:space-x-1">
// // //                       <button
// // //                         onClick={handleSaveNewVendorRate}
// // //                         className="bg-green-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-green-600 transition w-full sm:w-auto"
// // //                         disabled={loading}
// // //                       >
// // //                         Save
// // //                       </button>
// // //                       <button
// // //                         onClick={() => setNewVendorRate(null)}
// // //                         className="bg-gray-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-gray-600 transition w-full sm:w-auto"
// // //                         disabled={loading}
// // //                       >
// // //                         Cancel
// // //                       </button>
// // //                     </div>
// // //                   </td>
// // //                 </tr>
// // //               )}
// // //               <tr>
// // //                 <td colSpan="12" className="border p-1">
// // //                   <button
// // //                     onClick={handleAddVendorRow}
// // //                     className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-blue-600 transition"
// // //                     disabled={loading || newVendorRate}
// // //                   >
// // //                     Add
// // //                   </button>
// // //                 </td>
// // //               </tr>
// // //             </tbody>
// // //           </table>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default PLCComponent;

// // // import React, { useState, useEffect } from "react";
// // // import axios from "axios";

// // // const PLCComponent = ({ selectedProjectId, selectedPlan }) => {
// // //   const [billingRatesSchedule, setBillingRatesSchedule] = useState([]);
// // //   const [newRate, setNewRate] = useState(null);
// // //   const [loading, setLoading] = useState(false);
// // //   const [editBillRate, setEditBillRate] = useState({});
// // //   const [employees, setEmployees] = useState([]);
// // //   const [employeeBillingRates, setEmployeeBillingRates] = useState([]);
// // //   const [newEmployeeRate, setNewEmployeeRate] = useState(null);
// // //   const [editEmployeeBillRate, setEditEmployeeBillRate] = useState({});
// // //   const [vendorBillingRates, setVendorBillingRates] = useState([]);
// // //   const [newVendorRate, setNewVendorRate] = useState(null);
// // //   const [editVendorBillRate, setEditVendorBillRate] = useState({});
// // //   const [plcs, setPlcs] = useState([]);
// // //   const [plcSearch, setPlcSearch] = useState("");

// // //   // Dropdown options
// // //   // const lookupTypeOptions = ['Select', 'Employee', 'Contract Employee'];
// // //   const lookupTypeOptions = ["Select", "Employee", "Contract Vendor"];
// // //   const rateTypeOptions = ["Select", "Billing", "Actual"];

// // //   // Fetch billing rates schedule based on selected project ID
// // //   useEffect(() => {
// // //     const fetchBillingRates = async () => {
// // //       if (!selectedProjectId) return;
// // //       setLoading(true);
// // //       try {
// // //         const response = await axios.get(
// // //           `https://test-api-3tmq.onrender.com/api/ProjectPlcRates`
// // //         );
// // //         const filteredData = response.data.filter((item) =>
// // //           item.projId.toLowerCase().startsWith(selectedProjectId.toLowerCase())
// // //         );
// // //         setBillingRatesSchedule(
// // //           filteredData.map((item) => ({
// // //             id: item.id,
// // //             plc: item.laborCategoryCode,
// // //             billRate: item.billingRate,
// // //             rateType: item.rateType || "Select",
// // //             startDate: item.effectiveDate
// // //               ? item.effectiveDate.split("T")[0]
// // //               : "",
// // //             endDate: item.endDate ? item.endDate.split("T")[0] : null,
// // //           }))
// // //         );
// // //         const newEditBillRate = {};
// // //         filteredData.forEach((item) => {
// // //           newEditBillRate[item.id] = item.billingRate;
// // //         });
// // //         setEditBillRate(newEditBillRate);
// // //       } catch (error) {
// // //         console.error("Error fetching billing rates:", error);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };
// // //     fetchBillingRates();
// // //   }, [selectedProjectId]);

// // //   // Fetch employees for the selected project
// // //   useEffect(() => {
// // //     const fetchEmployees = async () => {
// // //       if (
// // //         !selectedProjectId ||
// // //         typeof selectedProjectId !== "string" ||
// // //         selectedProjectId.trim() === ""
// // //       ) {
// // //         setEmployees([]);
// // //         return;
// // //       }
// // //       setLoading(true);
// // //       try {
// // //         const response = await axios.get(
// // //           `https://test-api-3tmq.onrender.com/Project/GetEmployeesByProject/${selectedProjectId}`
// // //         );
// // //         setEmployees(
// // //           response.data.map((item) => ({
// // //             empId: item.empId,
// // //             employeeName: item.employeeName,
// // //           }))
// // //         );
// // //       } catch (error) {
// // //         console.error("Error fetching employees:", error);
// // //         setEmployees([]);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };
// // //     fetchEmployees();
// // //   }, [selectedProjectId]);

// // //   // Fetch PLCs for search
// // //   useEffect(() => {
// // //     const fetchPlcs = async () => {
// // //       if (!plcSearch) return;
// // //       try {
// // //         const response = await axios.get(
// // //           `https://test-api-3tmq.onrender.com/Project/GetAllPlcs/${plcSearch}`
// // //         );
// // //         const filteredPlcs = response.data
// // //           .filter((item) =>
// // //             item.laborCategoryCode
// // //               .toLowerCase()
// // //               .includes(plcSearch.toLowerCase())
// // //           )
// // //           .map((item) => ({
// // //             laborCategoryCode: item.laborCategoryCode,
// // //             description: item.description || "",
// // //           }));
// // //         setPlcs(filteredPlcs);
// // //       } catch (error) {
// // //         console.error("Error fetching PLCs:", error);
// // //       }
// // //     };
// // //     fetchPlcs();
// // //   }, [plcSearch]);

// // //   // Fetch employee billing rates using ProjEmplRt API
// // //   useEffect(() => {
// // //     const fetchEmployeeBillingRates = async () => {
// // //       if (!selectedProjectId) return;
// // //       setLoading(true);
// // //       try {
// // //         const response = await axios.get(
// // //           `https://test-api-3tmq.onrender.com/ProjEmplRt`
// // //         );
// // //         const filteredData = response.data.filter(
// // //           (item) =>
// // //             item.projId
// // //               .toLowerCase()
// // //               .startsWith(selectedProjectId.toLowerCase()) && item.emplId
// // //         );
// // //         setEmployeeBillingRates(
// // //           filteredData.map((item) => ({
// // //             id: item.id,
// // //             lookupType: item.lookupType || "Select",
// // //             empId: item.emplId,
// // //             employeeName:
// // //               item.employeeName ||
// // //               employees.find((emp) => emp.empId === item.emplId)
// // //                 ?.employeeName ||
// // //               "",
// // //             plc: item.billLabCatCd,
// // //             plcDescription: item.description || "",
// // //             billRate: item.billRtAmt,
// // //             rateType: item.sBillRtTypeCd || "Select",
// // //             startDate: item.startDt ? item.startDt.split("T")[0] : "",
// // //             endDate: item.endDt ? item.endDt.split("T")[0] : null,
// // //           }))
// // //         );
// // //         const newEditEmployeeBillRate = {};
// // //         filteredData.forEach((item) => {
// // //           newEditEmployeeBillRate[item.id] = item.billingRate;
// // //         });
// // //         setEditEmployeeBillRate(newEditEmployeeBillRate);
// // //       } catch (error) {
// // //         console.error("Error fetching employee billing rates:", error);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };
// // //     fetchEmployeeBillingRates();
// // //   }, [selectedProjectId, employees]);

// // //   // Fetch vendor billing rates
// // //   // useEffect(() => {
// // //   //   const fetchVendorBillingRates = async () => {
// // //   //     if (!selectedProjectId) return;
// // //   //     setLoading(true);
// // //   //     try {
// // //   //       const response = await axios.get(`https://test-api-3tmq.onrender.com/api/ProjectPlcRates`);
// // //   //       const filteredData = response.data.filter(item =>
// // //   //         item.projId.toLowerCase().startsWith(selectedProjectId.toLowerCase()) &&
// // //   //         item.vendorId
// // //   //       );
// // //   //       setVendorBillingRates(filteredData.map(item => ({
// // //   //         id: item.id,
// // //   //         lookupType: item.lookupType || 'Select',
// // //   //         vendorId: item.vendorId,
// // //   //         vendorName: item.vendorName || '',
// // //   //         vendorEmployee: item.vendorEmployee || '',
// // //   //         vendorEmployeeName: item.vendorEmployeeName || '',
// // //   //         plc: item.laborCategoryCode,
// // //   //         plcDescription: item.description || '',
// // //   //         billRate: item.billingRate,
// // //   //         rateType: item.rateType || 'Select',
// // //   //         startDate: item.effectiveDate ? item.effectiveDate.split('T')[0] : '',
// // //   //         endDate: item.endDate ? item.endDate.split('T')[0] : null,
// // //   //       })));
// // //   //       const newEditVendorBillRate = {};
// // //   //       filteredData.forEach(item => {
// // //   //         newEditVendorBillRate[item.id] = item.billingRate;
// // //   //       });
// // //   //       setEditVendorBillRate(newEditVendorBillRate);
// // //   //     } catch (error) {
// // //   //       console.error('Error fetching vendor billing rates:', error);
// // //   //     } finally {
// // //   //       setLoading(false);
// // //   //     }
// // //   //   };
// // //   //   fetchVendorBillingRates();
// // //   // }, [selectedProjectId]);
// // //   // Fetch vendor billing rates
// // //   useEffect(() => {
// // //     const fetchVendorBillingRates = async () => {
// // //       if (!selectedProjectId) return;
// // //       setLoading(true);
// // //       try {
// // //         const response = await axios.get(
// // //           `https://test-api-3tmq.onrender.com/ProjVendRt`
// // //         );
// // //         const filteredData = response.data.filter((item) =>
// // //           item.projId.toLowerCase().startsWith(selectedProjectId.toLowerCase())
// // //         );
// // //         setVendorBillingRates(
// // //           filteredData.map((item) => ({
// // //             id: item.id,
// // //             lookupType: item.lookupType || "Select",
// // //             vendorId: item.vendId || "",
// // //             vendorName: item.vendorName || "",
// // //             vendorEmployee: item.vendEmplId || "",
// // //             vendorEmployeeName: item.vendEmplName || "",
// // //             plc: item.billLabCatCd,
// // //             plcDescription: item.description || "",
// // //             billRate: item.billRtAmt,
// // //             rateType: item.sBillRtTypeCd || "Select",
// // //             startDate: new Date(item.startDt).toISOString().split("T")[0],
// // //             endDate: item.endDt
// // //               ? new Date(item.endDt).toISOString().split("T")[0]
// // //               : null,
// // //           }))
// // //         );
// // //         const newEditVendorBillRate = {};
// // //         filteredData.forEach((item) => {
// // //           newEditVendorBillRate[item.id] = item.billingRate;
// // //         });
// // //         setEditVendorBillRate(newEditVendorBillRate);
// // //       } catch (error) {
// // //         console.error("Error fetching vendor billing rates:", error);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };
// // //     fetchVendorBillingRates();
// // //   }, [selectedProjectId]);

// // //   const handleUpdate = async (id, updatedData) => {
// // //     setLoading(true);
// // //     try {
// // //       await axios.put(
// // //         `https://test-api-3tmq.onrender.com/api/ProjectPlcRates/${id}`,
// // //         {
// // //           id,
// // //           projId: selectedProjectId,
// // //           laborCategoryCode: updatedData.plc,
// // //           costRate: parseFloat(updatedData.billRate) * 0.65,
// // //           billingRate: parseFloat(updatedData.billRate),
// // //           effectiveDate: updatedData.startDate,
// // //           endDate: updatedData.endDate || null,
// // //           rateType: updatedData.rateType,
// // //           isActive: true,
// // //           modifiedBy: "admin",
// // //           createdAt: new Date().toISOString(),
// // //           updatedAt: new Date().toISOString(),
// // //         }
// // //       );
// // //       const fetchResponse = await axios.get(
// // //         `https://test-api-3tmq.onrender.com/api/ProjectPlcRates`
// // //       );
// // //       const filteredData = fetchResponse.data.filter((item) =>
// // //         item.projId.toLowerCase().startsWith(selectedProjectId.toLowerCase())
// // //       );
// // //       setBillingRatesSchedule(
// // //         filteredData.map((item) => ({
// // //           id: item.id,
// // //           plc: item.laborCategoryCode,
// // //           billRate: item.billingRate,
// // //           rateType: item.rateType || "Select",
// // //           startDate: item.effectiveDate ? item.effectiveDate.split("T")[0] : "",
// // //           endDate: item.endDate ? item.endDate.split("T")[0] : null,
// // //         }))
// // //       );
// // //       setEditBillRate((prev) => ({ ...prev, [id]: updatedData.billRate }));
// // //     } catch (error) {
// // //       console.error("Error updating billing rate:", error);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleDelete = async (id) => {
// // //     setLoading(true);
// // //     try {
// // //       await axios.delete(
// // //         `https://test-api-3tmq.onrender.com/api/ProjectPlcRates/${id}`
// // //       );
// // //       const response = await axios.get(
// // //         `https://test-api-3tmq.onrender.com/api/ProjectPlcRates`
// // //       );
// // //       const filteredData = response.data.filter((item) =>
// // //         item.projId.toLowerCase().startsWith(selectedProjectId.toLowerCase())
// // //       );
// // //       setBillingRatesSchedule(
// // //         filteredData.map((item) => ({
// // //           id: item.id,
// // //           plc: item.laborCategoryCode,
// // //           billRate: item.billingRate,
// // //           rateType: item.rateType || "Select",
// // //           startDate: item.effectiveDate ? item.effectiveDate.split("T")[0] : "",
// // //           endDate: item.endDate ? item.endDate.split("T")[0] : null,
// // //         }))
// // //       );
// // //       setEditBillRate((prev) => {
// // //         const newEditBillRate = { ...prev };
// // //         delete newEditBillRate[id];
// // //         return newEditBillRate;
// // //       });
// // //     } catch (error) {
// // //       console.error("Error deleting billing rate:", error);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleAddRow = () => {
// // //     setNewRate({
// // //       plc: "",
// // //       billRate: "",
// // //       rateType: "Select",
// // //       startDate: "",
// // //       endDate: "",
// // //     });
// // //   };

// // //   const handleSaveNewRate = async () => {
// // //     if (!newRate || !newRate.plc || !newRate.startDate || !newRate.billRate) {
// // //       console.error(
// // //         "Please fill all required fields (PLC, Bill Rate, Start Date)"
// // //       );
// // //       return;
// // //     }
// // //     setLoading(true);
// // //     try {
// // //       await axios.post(
// // //         `https://test-api-3tmq.onrender.com/api/ProjectPlcRates`,
// // //         {
// // //           id: 0,
// // //           projId: selectedProjectId,
// // //           laborCategoryCode: newRate.plc,
// // //           costRate: parseFloat(newRate.billRate) * 0.65,
// // //           billingRate: parseFloat(newRate.billRate),
// // //           effectiveDate: newRate.startDate,
// // //           endDate: newRate.endDate || null,
// // //           rateType: newRate.rateType,
// // //           isActive: true,
// // //           modifiedBy: "admin",
// // //           createdAt: new Date().toISOString(),
// // //           updatedAt: new Date().toISOString(),
// // //         }
// // //       );
// // //       setNewRate(null);
// // //       const fetchResponse = await axios.get(
// // //         `https://test-api-3tmq.onrender.com/api/ProjectPlcRates`
// // //       );
// // //       const filteredData = fetchResponse.data.filter((item) =>
// // //         item.projId.toLowerCase().startsWith(selectedProjectId.toLowerCase())
// // //       );
// // //       setBillingRatesSchedule(
// // //         filteredData.map((item) => ({
// // //           id: item.id,
// // //           plc: item.laborCategoryCode,
// // //           billRate: item.billingRate,
// // //           rateType: item.rateType || "Select",
// // //           startDate: item.effectiveDate ? item.effectiveDate.split("T")[0] : "",
// // //           endDate: item.endDate ? item.endDate.split("T")[0] : null,
// // //         }))
// // //       );
// // //     } catch (error) {
// // //       console.error(
// // //         "Error adding billing rate:",
// // //         error.response ? error.response.data : error.message
// // //       );
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleNewRateChange = (field, value) => {
// // //     setNewRate((prev) => ({ ...prev, [field]: value }));
// // //   };

// // //   const handleBillRateChange = (id, value) => {
// // //     setEditBillRate((prev) => ({ ...prev, [id]: value }));
// // //   };

// // //   // Employee Billing Rates Handlers
// // //   const handleAddEmployeeRow = () => {
// // //     setNewEmployeeRate({
// // //       lookupType: "Select",
// // //       empId: "",
// // //       employeeName: "",
// // //       plc: "",
// // //       billRate: "",
// // //       rateType: "Select",
// // //       startDate: "",
// // //       endDate: "",
// // //     });
// // //   };

// // //   const handleSaveNewEmployeeRate = async () => {
// // //     if (
// // //       !newEmployeeRate ||
// // //       !newEmployeeRate.empId ||
// // //       !newEmployeeRate.plc ||
// // //       !newEmployeeRate.startDate ||
// // //       !newEmployeeRate.billRate
// // //     ) {
// // //       console.error(
// // //         "Please fill all required fields (Employee, PLC, Bill Rate, Start Date)"
// // //       );
// // //       return;
// // //     }
// // //     setLoading(true);
// // //     try {
// // //       await axios.post(`https://test-api-3tmq.onrender.com/ProjEmplRt`, {
// // //         id: 0,
// // //         projId: selectedProjectId,
// // //         emplId: newEmployeeRate.empId,
// // //         employeeName: newEmployeeRate.employeeName,
// // //         BillLabCatCd: newEmployeeRate.plc,
// // //         // costRate: parseFloat(newEmployeeRate.billRate) * 0.65,
// // //         BillRtAmt: parseFloat(newEmployeeRate.billRate),
// // //         StartDt: newEmployeeRate.startDate,
// // //         EndDt: newEmployeeRate.endDate || null,
// // //         SBillRtTypeCd: newEmployeeRate.rateType,
// // //         lookupType: newEmployeeRate.lookupType,
// // //         isActive: true,
// // //         modifiedBy: "admin",
// // //         // createdAt: new Date().toISOString(),
// // //         // updatedAt: new Date().toISOString(),
// // //       });
// // //       setNewEmployeeRate(null);
// // //       const fetchResponse = await axios.get(
// // //         `https://test-api-3tmq.onrender.com/ProjEmplRt`
// // //       );
// // //       const filteredData = fetchResponse.data.filter(
// // //         (item) =>
// // //           item.projId
// // //             .toLowerCase()
// // //             .startsWith(selectedProjectId.toLowerCase()) && item.emplId
// // //       );
// // //       setEmployeeBillingRates(
// // //         filteredData.map((item) => ({
// // //           id: item.id,
// // //           lookupType: item.lookupType || "Select",
// // //           empId: item.emplId,
// // //           employeeName:
// // //             item.employeeName ||
// // //             employees.find((emp) => emp.empId === item.emplId)?.employeeName ||
// // //             "",
// // //           plc: item.laborCategoryCode,
// // //           plcDescription: item.description || "",
// // //           billRate: item.billingRate,
// // //           rateType: item.rateType || "Select",
// // //           startDate: item.effectiveDate ? item.effectiveDate.split("T")[0] : "",
// // //           endDate: item.endDate ? item.endDate.split("T")[0] : null,
// // //         }))
// // //       );
// // //     } catch (error) {
// // //       console.error(
// // //         "Error adding employee billing rate:",
// // //         error.response ? error.response.data : error.message
// // //       );
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleEmployeeBillRateChange = (id, value) => {
// // //     setEditEmployeeBillRate((prev) => ({ ...prev, [id]: value }));
// // //   };

// // //   const handleUpdateEmployee = async (id, updatedData) => {
// // //     setLoading(true);
// // //     try {
// // //       await axios.put(`https://test-api-3tmq.onrender.com/ProjEmplRt/${id}`, {
// // //         id,
// // //         projId: selectedProjectId,
// // //         emplId: updatedData.empId,
// // //         employeeName: updatedData.employeeName,
// // //         laborCategoryCode: updatedData.plc,
// // //         costRate: parseFloat(updatedData.billRate) * 0.65,
// // //         billingRate: parseFloat(updatedData.billRate),
// // //         effectiveDate: updatedData.startDate,
// // //         endDate: updatedData.endDate || null,
// // //         rateType: updatedData.rateType,
// // //         lookupType: updatedData.lookupType,
// // //         isActive: true,
// // //         modifiedBy: "admin",
// // //         createdAt: new Date().toISOString(),
// // //         updatedAt: new Date().toISOString(),
// // //       });
// // //       const fetchResponse = await axios.get(
// // //         `https://test-api-3tmq.onrender.com/ProjEmplRt`
// // //       );
// // //       const filteredData = fetchResponse.data.filter(
// // //         (item) =>
// // //           item.projId
// // //             .toLowerCase()
// // //             .startsWith(selectedProjectId.toLowerCase()) && item.emplId
// // //       );
// // //       setEmployeeBillingRates(
// // //         filteredData.map((item) => ({
// // //           id: item.id,
// // //           lookupType: item.lookupType || "Select",
// // //           empId: item.emplId,
// // //           employeeName:
// // //             item.employeeName ||
// // //             employees.find((emp) => emp.empId === item.emplId)?.employeeName ||
// // //             "",
// // //           plc: item.laborCategoryCode,
// // //           plcDescription: item.description || "",
// // //           billRate: item.billingRate,
// // //           rateType: item.rateType || "Select",
// // //           startDate: item.effectiveDate ? item.effectiveDate.split("T")[0] : "",
// // //           endDate: item.endDate ? item.endDate.split("T")[0] : null,
// // //         }))
// // //       );
// // //       setEditEmployeeBillRate((prev) => ({
// // //         ...prev,
// // //         [id]: updatedData.billRate,
// // //       }));
// // //     } catch (error) {
// // //       console.error("Error updating employee billing rate:", error);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleDeleteEmployee = async (id) => {
// // //     setLoading(true);
// // //     try {
// // //       await axios.delete(`https://test-api-3tmq.onrender.com/ProjEmplRt/${id}`);
// // //       const response = await axios.get(
// // //         `https://test-api-3tmq.onrender.com/ProjEmplRt`
// // //       );
// // //       const filteredData = response.data.filter(
// // //         (item) =>
// // //           item.projId
// // //             .toLowerCase()
// // //             .startsWith(selectedProjectId.toLowerCase()) && item.emplId
// // //       );
// // //       setEmployeeBillingRates(
// // //         filteredData.map((item) => ({
// // //           id: item.id,
// // //           lookupType: item.lookupType || "Select",
// // //           empId: item.emplId,
// // //           employeeName:
// // //             item.employeeName ||
// // //             employees.find((emp) => emp.empId === item.emplId)?.employeeName ||
// // //             "",
// // //           plc: item.billLabCatCd,
// // //           plcDescription: item.description || "",
// // //           billRate: item.billRtAmt,
// // //           rateType: item.sBillRtTypeCd || "Select",
// // //           startDate: item.startDt ? item.startDt.split("T")[0] : "",
// // //           endDate: item.endDt ? item.endDt.split("T")[0] : null,
// // //         }))
// // //       );
// // //       setEditEmployeeBillRate((prev) => {
// // //         const newEditEmployeeBillRate = { ...prev };
// // //         delete newEditEmployeeBillRate[id];
// // //         return newEditEmployeeBillRate;
// // //       });
// // //     } catch (error) {
// // //       console.error("Error deleting employee billing rate:", error);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleNewEmployeeRateChange = (field, value, id = null) => {
// // //     if (id) {
// // //       // Update existing row
// // //       const selectedEmp =
// // //         field === "empId" ? employees.find((emp) => emp.empId === value) : null;
// // //       setEmployeeBillingRates((prev) =>
// // //         prev.map((rate) =>
// // //           rate.id === id
// // //             ? {
// // //                 ...rate,
// // //                 [field]: value,
// // //                 ...(field === "empId" && selectedEmp
// // //                   ? { employeeName: selectedEmp.employeeName }
// // //                   : {}),
// // //               }
// // //             : rate
// // //         )
// // //       );
// // //     } else {
// // //       // Update new row
// // //       const selectedEmp =
// // //         field === "empId" ? employees.find((emp) => emp.empId === value) : null;
// // //       setNewEmployeeRate((prev) => ({
// // //         ...prev,
// // //         [field]: value,
// // //         ...(field === "empId" && selectedEmp
// // //           ? { employeeName: selectedEmp.employeeName }
// // //           : {}),
// // //       }));
// // //     }
// // //   };

// // //   // Vendor Billing Rates Handlers
// // //   // const handleAddVendorRow = () => {
// // //   //   setNewVendorRate({ lookupType: 'Select', vendorId: '', vendorEmployee: '', plc: '', billRate: '', rateType: 'Select', startDate: '', endDate: '' });
// // //   // };
// // //   const handleAddVendorRow = () => {
// // //     setNewVendorRate({
// // //       lookupType: "Select",
// // //       vendorId: "",
// // //       vendorName: "",
// // //       vendorEmployee: "",
// // //       vendorEmployeeName: "",
// // //       plc: "",
// // //       billRate: "",
// // //       rateType: "Select",
// // //       startDate: "",
// // //       endDate: "",
// // //     });
// // //   };

// // //   // const handleSaveNewVendorRate = async () => {
// // //   //   if (!newVendorRate || !newVendorRate.vendorId || !newVendorRate.plc || !newVendorRate.startDate || !newVendorRate.billRate) {
// // //   //     console.error('Please fill all required fields (Vendor, PLC, Bill Rate, Start Date)');
// // //   //     return;
// // //   //   }
// // //   //   setLoading(true);
// // //   //   try {
// // //   //     await axios.post(`https://test-api-3tmq.onrender.com/api/ProjectPlcRates`, {
// // //   //       id: 0,
// // //   //       projId: selectedProjectId,
// // //   //       vendorId: newVendorRate.vendorId,
// // //   //       vendorEmployee: newVendorRate.vendorEmployee,
// // //   //       laborCategoryCode: newVendorRate.plc,
// // //   //       costRate: parseFloat(newVendorRate.billRate) * 0.65,
// // //   //       billingRate: parseFloat(newVendorRate.billRate),
// // //   //       effectiveDate: newVendorRate.startDate,
// // //   //       endDate: newVendorRate.endDate || null,
// // //   //       rateType: newVendorRate.rateType,
// // //   //       lookupType: newVendorRate.lookupType,
// // //   //       isActive: true,
// // //   //       modifiedBy: "admin",
// // //   //       createdAt: new Date().toISOString(),
// // //   //       updatedAt: new Date().toISOString(),
// // //   //     });
// // //   //     setNewVendorRate(null);
// // //   //     const fetchResponse = await axios.get(`https://test-api-3tmq.onrender.com/api/ProjectPlcRates`);
// // //   //     const filteredData = fetchResponse.data.filter(item =>
// // //   //       item.projId.toLowerCase().startsWith(selectedProjectId.toLowerCase()) &&
// // //   //       item.vendorId
// // //   //     );
// // //   //     setVendorBillingRates(filteredData.map(item => ({
// // //   //       id: item.id,
// // //   //       lookupType: item.lookupType || 'Select',
// // //   //       vendorId: item.vendorId,
// // //   //       vendorName: item.vendorName || '',
// // //   //       vendorEmployee: item.vendorEmployee || '',
// // //   //       vendorEmployeeName: item.vendorEmployeeName || '',
// // //   //       plc: item.laborCategoryCode,
// // //   //       plcDescription: item.description || '',
// // //   //       billRate: item.billingRate,
// // //   //       rateType: item.rateType || 'Select',
// // //   //       startDate: item.effectiveDate ? item.effectiveDate.split('T')[0] : '',
// // //   //       endDate: item.endDate ? item.endDate.split('T')[0] : null,
// // //   //     })));
// // //   //   } catch (error) {
// // //   //     console.error('Error adding vendor billing rate:', error.response ? error.response.data : error.message);
// // //   //   } finally {
// // //   //     setLoading(false);
// // //   //   }
// // //   // };
// // //   const handleSaveNewVendorRate = async () => {
// // //     if (
// // //       !newVendorRate ||
// // //       !newVendorRate.vendorId ||
// // //       !newVendorRate.vendorName ||
// // //       !newVendorRate.plc ||
// // //       !newVendorRate.startDate ||
// // //       !newVendorRate.billRate
// // //     ) {
// // //       console.error(
// // //         "Please fill all required fields (Vendor ID, Vendor Name, PLC, Bill Rate, Start Date)"
// // //       );
// // //       console.log(JSON.stringify(newVendorRate));
// // //       return;
// // //     }
// // //     setLoading(true);
// // //     try {
// // //       await axios.post(`https://test-api-3tmq.onrender.com/ProjVendRt`, {
// // //   projVendRtKey: 0,
// // //   projId: selectedPlan?.projId, // <-- Use the full project id from the selected plan
// // //   vendId: newVendorRate.vendorId,
// // //   vendEmplId: newVendorRate.vendorEmployee,
// // //   billLabCatCd: newVendorRate.plc,
// // //   billDiscRt: 0,
// // //   companyId: "1",
// // //   billRtAmt: parseFloat(newVendorRate.billRate),
// // //   startDt: new Date(newVendorRate.startDate).toISOString(), // <-- ISO string
// // //   endDt: newVendorRate.endDate ? new Date(newVendorRate.endDate).toISOString() : null, // <-- ISO string
// // //   sBillRtTypeCd: newVendorRate.rateType, // <-- lowercase 's'
// // //   modifiedBy: "admin",
// // //   timeStamp: new Date().toISOString(), // <-- Add timestamp
// // // });
// // //       // await axios.post(`https://test-api-3tmq.onrender.com/ProjVendRt`, {
// // //       //   projVendRtKey: 0,
// // //       //   projId: selectedProjectId,
// // //       //   vendId: newVendorRate.vendorId,
// // //       //   vendorName: newVendorRate.vendorName,
// // //       //   vendEmplId: newVendorRate.vendorEmployee,
// // //       //   vendEmplName: newVendorRate.vendorEmployeeName,
// // //       //   billLabCatCd: newVendorRate.plc,
// // //       //   billDiscRt: 0,
// // //       //   companyId: "1",
// // //       //   billRtAmt: parseFloat(newVendorRate.billRate), 
// // //       //   startDt: newVendorRate.startDate,
// // //       //   endDt: newVendorRate.endDate || null,
// // //       //   SBillRtTypeCd: newVendorRate.rateType,
// // //       //   lookupType: newVendorRate.lookupType,
// // //       //   // isActive: true,
// // //       //   modifiedBy: "admin",
// // //       // });
// // //       setNewVendorRate(null);
// // //       const fetchResponse = await axios.get(
// // //         `https://test-api-3tmq.onrender.com/ProjVendRt`
// // //       );
// // //       const filteredData = fetchResponse.data.filter((item) =>
// // //         item.projId.toLowerCase().startsWith(selectedProjectId.toLowerCase())
// // //       );
// // //       setVendorBillingRates(
// // //         filteredData.map((item) => ({
// // //           id: item.id,
// // //           lookupType: item.lookupType || "Select",
// // //           vendorId: item.vendId || "",
// // //           vendorName: item.vendorName || "",
// // //           vendorEmployee: item.vendEmplId || "",
// // //           vendorEmployeeName: item.vendEmplName || "",
// // //           plc: item.billLabCatCd,
// // //           plcDescription: item.description || "",
// // //           BillRtAmt: item.billRtAmt,
// // //           rateType: item.sBillRtTypeCd || "Select",
// // //           startDate: new Date(item.startDt).toISOString().split("T")[0],
// // //           endDate: item.endDt
// // //             ? new Date(item.endDt).toISOString().split("T")[0]
// // //             : null,
// // //         }))
// // //       );
// // //     } catch (error) {
// // //       console.error(
// // //         "Error adding vendor billing rate:",
// // //         error.response ? error.response.data : error.message
// // //       );
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleVendorBillRateChange = (id, value) => {
// // //     setEditVendorBillRate((prev) => ({ ...prev, [id]: value }));
// // //   };

// // //   const handleUpdateVendor = async (id, updatedData) => {
// // //     setLoading(true);
// // //     try {
// // //       await axios.put(`https://test-api-3tmq.onrender.com/ProjVendRt/${id}`, {
// // //         id,
// // //         projId: selectedProjectId,
// // //         vendId: updatedData.vendorId,
// // //         vendorName: updatedData.vendorName,
// // //         vendEmplId: updatedData.vendorEmployee,
// // //         vendEmplName: updatedData.vendorEmployeeName,
// // //         laborCategoryCode: updatedData.plc,
// // //         // costRate: parseFloat(updatedData.billRate) * 0.65,
// // //         billingRate: parseFloat(updatedData.billRate),
// // //         effectiveDate: updatedData.startDate,
// // //         endDate: updatedData.endDate || null,
// // //         rateType: updatedData.rateType,
// // //         lookupType: updatedData.lookupType,
// // //         isActive: true,
// // //         modifiedBy: "admin",
// // //         createdAt: new Date().toISOString(),
// // //         updatedAt: new Date().toISOString(),
// // //       });
// // //       const fetchResponse = await axios.get(
// // //         `https://test-api-3tmq.onrender.com/ProjVendRt`
// // //       );
// // //       const filteredData = fetchResponse.data.filter((item) =>
// // //         item.projId.toLowerCase().startsWith(selectedProjectId.toLowerCase())
// // //       );
// // //       setVendorBillingRates(
// // //         filteredData.map((item) => ({
// // //           id: item.id,
// // //           lookupType: item.lookupType || "Select",
// // //           vendorId: item.vendId || "",
// // //           vendorName: item.vendorName || "",
// // //           vendorEmployee: item.vendEmplId || "",
// // //           vendorEmployeeName: item.vendEmplName || "",
// // //           plc: item.billLabCatCd,
// // //           plcDescription: item.description || "",
// // //           billRate: item.billRtAmt,
// // //           rateType: item.sBillRtTypeCd || "Select",
// // //           startDate: new Date(item.startDt).toISOString().split("T")[0],
// // //           endDate: item.endDt
// // //             ? new Date(item.endDt).toISOString().split("T")[0]
// // //             : null,
// // //         }))
// // //       );
// // //       setEditVendorBillRate((prev) => ({
// // //         ...prev,
// // //         [id]: updatedData.billRate,
// // //       }));
// // //     } catch (error) {
// // //       console.error("Error updating vendor billing rate:", error);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // const handleDeleteVendor = async (id) => {
// // //   //   setLoading(true);
// // //   //   try {
// // //   //     await axios.delete(`https://test-api-3tmq.onrender.com/api/ProjectPlcRates/${id}`);
// // //   //     const response = await axios.get(`https://test-api-3tmq.onrender.com/api/ProjectPlcRates`);
// // //   //     const filteredData = response.data.filter(item =>
// // //   //       item.projId.toLowerCase().startsWith(selectedProjectId.toLowerCase()) &&
// // //   //       item.vendorId
// // //   //     );
// // //   //     setVendorBillingRates(filteredData.map(item => ({
// // //   //       id: item.id,
// // //   //       lookupType: item.lookupType || 'Select',
// // //   //       vendorId: item.vendorId,
// // //   //       vendorName: item.vendorName || '',
// // //   //       vendorEmployee: item.vendorEmployee || '',
// // //   //       vendorEmployeeName: item.vendorEmployeeName || '',
// // //   //       plc: item.laborCategoryCode,
// // //   //       plcDescription: item.description || '',
// // //   //       billRate: item.billingRate,
// // //   //       rateType: item.rateType || 'Select',
// // //   //       startDate: item.effectiveDate ? item.effectiveDate.split('T')[0] : '',
// // //   //       endDate: item.endDate ? item.endDate.split('T')[0] : null,
// // //   //     })));
// // //   //     setEditVendorBillRate(prev => {
// // //   //       const newEditVendorBillRate = { ...prev };
// // //   //       delete newEditVendorBillRate[id];
// // //   //       return newEditVendorBillRate;
// // //   //     });
// // //   //   } catch (error) {
// // //   //     console.error('Error deleting vendor billing rate:', error);
// // //   //   } finally {
// // //   //     setLoading(false);
// // //   //   }
// // //   // };
// // //   const handleDeleteVendor = async (id) => {
// // //     setLoading(true);
// // //     try {
// // //       await axios.delete(`https://test-api-3tmq.onrender.com/ProjVendRt/${id}`);
// // //       const response = await axios.get(
// // //         `https://test-api-3tmq.onrender.com/ProjVendRt`
// // //       );
// // //       const filteredData = response.data.filter((item) =>
// // //         item.projId.toLowerCase().startsWith(selectedProjectId.toLowerCase())
// // //       );
// // //       setVendorBillingRates(
// // //         filteredData.map((item) => ({
// // //           id: item.id,
// // //           lookupType: item.lookupType || "Select",
// // //           vendorId: item.vendId || "",
// // //           vendorName: item.vendorName || "",
// // //           vendorEmployee: item.vendEmplId || "",
// // //           vendorEmployeeName: item.vendEmplName || "",
// // //           plc: item.laborCategoryCode,
// // //           plcDescription: item.description || "",
// // //           billRate: item.billingRate,
// // //           rateType: item.rateType || "Select",
// // //           startDate: new Date(item.effectiveDate).toISOString().split("T")[0],
// // //           endDate: item.endDate
// // //             ? new Date(item.endDate).toISOString().split("T")[0]
// // //             : null,
// // //         }))
// // //       );
// // //       setEditVendorBillRate((prev) => {
// // //         const newEditVendorBillRate = { ...prev };
// // //         delete newEditVendorBillRate[id];
// // //         return newEditVendorBillRate;
// // //       });
// // //     } catch (error) {
// // //       console.error("Error deleting vendor billing rate:", error);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };
// // //   const handleNewVendorRateChange = (field, value) => {
// // //     setNewVendorRate((prev) => ({ ...prev, [field]: value }));
// // //   };

// // //   return (
// // //     <div className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16 text-xs">
// // //       <div className="mb-4">
// // //         <h3 className="text-xs font-normal">
// // //           Project Labor Categories Billing Rates Schedule
// // //         </h3>
// // //         <div className="overflow-x-auto">
// // //           <table className="w-full text-xs border-collapse">
// // //             <thead>
// // //               <tr className="bg-gray-100">
// // //                 <th className="border p-1 font-normal">Plc</th>
// // //                 <th className="border p-1 font-normal">Bill Rate</th>
// // //                 <th className="border p-1 font-normal">Rate Type</th>
// // //                 <th className="border p-1 font-normal">Start Date</th>
// // //                 <th className="border p-1 font-normal">End Date</th>
// // //                 <th className="border p-1 font-normal">Actions</th>
// // //               </tr>
// // //             </thead>
// // //             <tbody>
// // //               {loading ? (
// // //                 <tr>
// // //                   <td colSpan="6" className="border p-1 text-center">
// // //                     Loading...
// // //                   </td>
// // //                 </tr>
// // //               ) : billingRatesSchedule.length === 0 ? (
// // //                 <tr>
// // //                   <td colSpan="6" className="border p-1 text-center">
// // //                     No data available
// // //                   </td>
// // //                 </tr>
// // //               ) : (
// // //                 billingRatesSchedule.map((item) => (
// // //                   <tr
// // //                     key={item.id}
// // //                     className="sm:table-row flex flex-col sm:flex-row mb-1 sm:mb-0"
// // //                   >
// // //                     <td className="border p-1 sm:w-1/6">
// // //                       <input
// // //                         type="text"
// // //                         value={item.plc}
// // //                         onChange={(e) => {
// // //                           handleNewRateChange("plc", e.target.value);
// // //                           setPlcSearch(e.target.value);
// // //                         }}
// // //                         className="w-full p-1 border rounded text-xs"
// // //                         list="plc-list"
// // //                       />
// // //                       <datalist id="plc-list">
// // //                         {plcs.map((plc) => (
// // //                           <option
// // //                             key={plc.laborCategoryCode}
// // //                             value={plc.laborCategoryCode}
// // //                           >
// // //                             {plc.description}
// // //                           </option>
// // //                         ))}
// // //                       </datalist>
// // //                     </td>
// // //                     <td className="border p-1 sm:w-1/6">
// // //                       <input
// // //                         type="text"
// // //                         value={editBillRate[item.id] || item.billRate}
// // //                         onChange={(e) =>
// // //                           handleBillRateChange(item.id, e.target.value)
// // //                         }
// // //                         className="w-full p-1 border rounded text-xs"
// // //                       />
// // //                     </td>
// // //                     <td className="border p-1 sm:w-1/6">
// // //                       <select
// // //                         value={item.rateType}
// // //                         onChange={(e) =>
// // //                           handleNewRateChange("rateType", e.target.value)
// // //                         }
// // //                         className="w-full p-1 border rounded text-xs"
// // //                       >
// // //                         {rateTypeOptions.map((option) => (
// // //                           <option key={option} value={option}>
// // //                             {option}
// // //                           </option>
// // //                         ))}
// // //                       </select>
// // //                     </td>
// // //                     <td className="border p-1 sm:w-1/6">
// // //                       <input
// // //                         type="date"
// // //                         value={item.startDate}
// // //                         onChange={(e) =>
// // //                           handleNewRateChange("startDate", e.target.value)
// // //                         }
// // //                         className="w-full p-1 border rounded text-xs"
// // //                       />
// // //                     </td>
// // //                     <td className="border p-1 sm:w-1/6">
// // //                       <input
// // //                         type="date"
// // //                         value={item.endDate || ""}
// // //                         onChange={(e) =>
// // //                           handleNewRateChange("endDate", e.target.value)
// // //                         }
// // //                         className="w-full p-1 border rounded text-xs"
// // //                       />
// // //                     </td>
// // //                     <td className="border p-1 sm:w-1/6">
// // //                       <div className="flex flex-col sm:flex-row justify-center space-y-1 sm:space-y-0 sm:space-x-1">
// // //                         <button
// // //                           onClick={() =>
// // //                             handleUpdate(item.id, {
// // //                               ...item,
// // //                               billRate: editBillRate[item.id] || item.billRate,
// // //                             })
// // //                           }
// // //                           className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-yellow-600 transition w-full sm:w-auto"
// // //                           disabled={loading}
// // //                         >
// // //                           Update
// // //                         </button>
// // //                         <button
// // //                           onClick={() => handleDelete(item.id)}
// // //                           className="bg-red-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-red-600 transition w-full sm:w-auto"
// // //                           disabled={loading}
// // //                         >
// // //                           Delete
// // //                         </button>
// // //                       </div>
// // //                     </td>
// // //                   </tr>
// // //                 ))
// // //               )}
// // //               {newRate && (
// // //                 <tr className="sm:table-row flex flex-col sm:flex-row mb-1 sm:mb-0">
// // //                   <td className="border p-1 sm:w-1/6">
// // //                     <input
// // //                       type="text"
// // //                       value={newRate.plc || ""}
// // //                       onChange={(e) => {
// // //                         handleNewRateChange("plc", e.target.value);
// // //                         setPlcSearch(e.target.value);
// // //                       }}
// // //                       className="w-full p-1 border rounded text-xs"
// // //                       list="plc-list"
// // //                     />
// // //                     <datalist id="plc-list">
// // //                       {plcs.map((plc) => (
// // //                         <option
// // //                           key={plc.laborCategoryCode}
// // //                           value={plc.laborCategoryCode}
// // //                         >
// // //                           {plc.description}
// // //                         </option>
// // //                       ))}
// // //                     </datalist>
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/6">
// // //                     <input
// // //                       type="text"
// // //                       value={newRate.billRate || ""}
// // //                       onChange={(e) =>
// // //                         handleNewRateChange("billRate", e.target.value)
// // //                       }
// // //                       className="w-full p-1 border rounded text-xs"
// // //                     />
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/6">
// // //                     <select
// // //                       value={newRate.rateType}
// // //                       onChange={(e) =>
// // //                         handleNewRateChange("rateType", e.target.value)
// // //                       }
// // //                       className="w-full p-1 border rounded text-xs"
// // //                     >
// // //                       {rateTypeOptions.map((option) => (
// // //                         <option key={option} value={option}>
// // //                           {option}
// // //                         </option>
// // //                       ))}
// // //                     </select>
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/6">
// // //                     <input
// // //                       type="date"
// // //                       value={newRate.startDate || ""}
// // //                       onChange={(e) =>
// // //                         handleNewRateChange("startDate", e.target.value)
// // //                       }
// // //                       className="w-full p-1 border rounded text-xs"
// // //                     />
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/6">
// // //                     <input
// // //                       type="date"
// // //                       value={newRate.endDate || ""}
// // //                       onChange={(e) =>
// // //                         handleNewRateChange("endDate", e.target.value)
// // //                       }
// // //                       className="w-full p-1 border rounded text-xs"
// // //                     />
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/6">
// // //                     <div className="flex flex-col sm:flex-row justify-center space-y-1 sm:space-y-0 sm:space-x-1">
// // //                       <button
// // //                         onClick={handleSaveNewRate}
// // //                         className="bg-green-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-green-600 transition w-full sm:w-auto"
// // //                         disabled={loading}
// // //                       >
// // //                         Save
// // //                       </button>
// // //                       <button
// // //                         onClick={() => setNewRate(null)}
// // //                         className="bg-gray-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-gray-600 transition w-full sm:w-auto"
// // //                         disabled={loading}
// // //                       >
// // //                         Cancel
// // //                       </button>
// // //                     </div>
// // //                   </td>
// // //                 </tr>
// // //               )}
// // //               <tr>
// // //                 <td colSpan="6" className="border p-1">
// // //                   <button
// // //                     onClick={handleAddRow}
// // //                     className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-blue-600 transition"
// // //                     disabled={loading || newRate}
// // //                   >
// // //                     Add
// // //                   </button>
// // //                 </td>
// // //               </tr>
// // //             </tbody>
// // //           </table>
// // //         </div>
// // //       </div>

// // //       <div className="mb-4">
// // //         <h3 className="text-xs font-normal">Employee Billing Rates Schedule</h3>
// // //         <div className="overflow-x-auto">
// // //           <table className="w-full text-xs border-collapse">
// // //             <thead>
// // //               <tr className="bg-gray-100">
// // //                 <th className="border p-1 font-normal">Lookup Type</th>
// // //                 <th className="border p-1 font-normal">Employee</th>
// // //                 <th className="border p-1 font-normal">Employee Name</th>
// // //                 <th className="border p-1 font-normal">PLC</th>
// // //                 <th className="border p-1 font-normal">PLC Description</th>
// // //                 <th className="border p-1 font-normal">Bill Rate</th>
// // //                 <th className="border p-1 font-normal">Rate Type</th>
// // //                 <th className="border p-1 font-normal">Start Date</th>
// // //                 <th className="border p-1 font-normal">End Date</th>
// // //                 <th className="border p-1 font-normal">Actions</th>
// // //               </tr>
// // //             </thead>
// // //             <tbody>
// // //               {loading ? (
// // //                 <tr>
// // //                   <td colSpan="10" className="border p-1 text-center">
// // //                     Loading...
// // //                   </td>
// // //                 </tr>
// // //               ) : employeeBillingRates.length === 0 && !newEmployeeRate ? (
// // //                 <tr>
// // //                   <td colSpan="10" className="border p-1 text-center">
// // //                     No data available
// // //                   </td>
// // //                 </tr>
// // //               ) : (
// // //                 employeeBillingRates.map((item) => (
// // //                   <tr
// // //                     key={item.id}
// // //                     className="sm:table-row flex flex-col sm:flex-row mb-1 sm:mb-0"
// // //                   >
// // //                     <td className="border p-1 sm:w-1/10">
// // //                       <select
// // //                         value={item.lookupType}
// // //                         onChange={(e) =>
// // //                           handleNewEmployeeRateChange(
// // //                             "lookupType",
// // //                             e.target.value,
// // //                             item.id
// // //                           )
// // //                         }
// // //                         className="w-full p-1 border rounded text-xs"
// // //                       >
// // //                         {lookupTypeOptions.map((option) => (
// // //                           <option key={option} value={option}>
// // //                             {option}
// // //                           </option>
// // //                         ))}
// // //                       </select>
// // //                     </td>
// // //                     <td className="border p-1 sm:w-1/10">
// // //                       <select
// // //                         value={item.empId}
// // //                         onChange={(e) =>
// // //                           handleNewEmployeeRateChange(
// // //                             "empId",
// // //                             e.target.value,
// // //                             item.id
// // //                           )
// // //                         }
// // //                         className="w-full p-1 border rounded text-xs"
// // //                         disabled={employees.length === 0}
// // //                       >
// // //                         <option value="">Select Employee</option>
// // //                         {employees.map((emp) => (
// // //                           <option key={emp.empId} value={emp.empId}>
// // //                             {emp.empId}
// // //                           </option>
// // //                         ))}
// // //                       </select>
// // //                     </td>
// // //                     <td className="border p-1 sm:w-1/10">
// // //                       {item.employeeName}
// // //                     </td>
// // //                     <td className="border p-1 sm:w-1/10">
// // //                       <input
// // //                         type="text"
// // //                         value={item.plc}
// // //                         onChange={(e) => {
// // //                           handleNewEmployeeRateChange(
// // //                             "plc",
// // //                             e.target.value,
// // //                             item.id
// // //                           );
// // //                           setPlcSearch(e.target.value);
// // //                         }}
// // //                         className="w-full p-1 border rounded text-xs"
// // //                         list="plc-list"
// // //                       />
// // //                       <datalist id="plc-list">
// // //                         {plcs.map((plc) => (
// // //                           <option
// // //                             key={plc.laborCategoryCode}
// // //                             value={plc.laborCategoryCode}
// // //                           >
// // //                             {plc.description}
// // //                           </option>
// // //                         ))}
// // //                       </datalist>
// // //                     </td>
// // //                     <td className="border p-1 sm:w-1/10">
// // //                       {plcs.find((plc) => plc.laborCategoryCode === item.plc)
// // //                         ?.description || item.plcDescription}
// // //                     </td>
// // //                     <td className="border p-1 sm:w-1/10">
// // //                       <input
// // //                         type="text"
// // //                         value={editEmployeeBillRate[item.id] || item.billRate}
// // //                         onChange={(e) =>
// // //                           handleEmployeeBillRateChange(item.id, e.target.value)
// // //                         }
// // //                         className="w-full p-1 border rounded text-xs"
// // //                       />
// // //                     </td>
// // //                     <td className="border p-1 sm:w-1/10">
// // //                       <select
// // //                         value={item.rateType}
// // //                         onChange={(e) =>
// // //                           handleNewEmployeeRateChange(
// // //                             "rateType",
// // //                             e.target.value,
// // //                             item.id
// // //                           )
// // //                         }
// // //                         className="w-full p-1 border rounded text-xs"
// // //                       >
// // //                         {rateTypeOptions.map((option) => (
// // //                           <option key={option} value={option}>
// // //                             {option}
// // //                           </option>
// // //                         ))}
// // //                       </select>
// // //                     </td>
// // //                     <td className="border p-1 sm:w-1/10">
// // //                       <input
// // //                         type="date"
// // //                         value={item.startDate}
// // //                         onChange={(e) =>
// // //                           handleNewEmployeeRateChange(
// // //                             "startDate",
// // //                             e.target.value,
// // //                             item.id
// // //                           )
// // //                         }
// // //                         className="w-full p-1 border rounded text-xs"
// // //                       />
// // //                     </td>
// // //                     <td className="border p-1 sm:w-1/10">
// // //                       <input
// // //                         type="date"
// // //                         value={item.endDate || ""}
// // //                         onChange={(e) =>
// // //                           handleNewEmployeeRateChange(
// // //                             "endDate",
// // //                             e.target.value,
// // //                             item.id
// // //                           )
// // //                         }
// // //                         className="w-full p-1 border rounded text-xs"
// // //                       />
// // //                     </td>
// // //                     <td className="border p-1 sm:w-1/10">
// // //                       <div className="flex flex-col sm:flex-row justify-center space-y-1 sm:space-y-0 sm:space-x-1">
// // //                         <button
// // //                           onClick={() =>
// // //                             handleUpdateEmployee(item.id, {
// // //                               ...item,
// // //                               billRate:
// // //                                 editEmployeeBillRate[item.id] || item.billRate,
// // //                             })
// // //                           }
// // //                           className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-yellow-600 transition w-full sm:w-auto"
// // //                           disabled={loading}
// // //                         >
// // //                           Update
// // //                         </button>
// // //                         <button
// // //                           onClick={() => handleDeleteEmployee(item.id)}
// // //                           className="bg-red-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-red-600 transition w-full sm:w-auto"
// // //                           disabled={loading}
// // //                         >
// // //                           Delete
// // //                         </button>
// // //                       </div>
// // //                     </td>
// // //                   </tr>
// // //                 ))
// // //               )}
// // //               {newEmployeeRate && (
// // //                 <tr className="sm:table-row flex flex-col sm:flex-row mb-1 sm:mb-0">
// // //                   <td className="border p-1 sm:w-1/10">
// // //                     <select
// // //                       value={newEmployeeRate.lookupType}
// // //                       onChange={(e) =>
// // //                         handleNewEmployeeRateChange(
// // //                           "lookupType",
// // //                           e.target.value
// // //                         )
// // //                       }
// // //                       className="w-full p-1 border rounded text-xs"
// // //                     >
// // //                       {lookupTypeOptions.map((option) => (
// // //                         <option key={option} value={option}>
// // //                           {option}
// // //                         </option>
// // //                       ))}
// // //                     </select>
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/10">
// // //                     <select
// // //                       value={newEmployeeRate.empId || ""}
// // //                       onChange={(e) =>
// // //                         handleNewEmployeeRateChange("empId", e.target.value)
// // //                       }
// // //                       className="w-full p-1 border rounded text-xs"
// // //                       disabled={employees.length === 0}
// // //                     >
// // //                       <option value="">Select Employee</option>
// // //                       {employees.map((emp) => (
// // //                         <option key={emp.empId} value={emp.empId}>
// // //                           {emp.empId}
// // //                         </option>
// // //                       ))}
// // //                     </select>
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/10">
// // //                     {newEmployeeRate.employeeName || ""}
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/10">
// // //                     <input
// // //                       type="text"
// // //                       value={newEmployeeRate.plc || ""}
// // //                       onChange={(e) => {
// // //                         handleNewEmployeeRateChange("plc", e.target.value);
// // //                         setPlcSearch(e.target.value);
// // //                       }}
// // //                       className="w-full p-1 border rounded text-xs"
// // //                       list="plc-list"
// // //                     />
// // //                     <datalist id="plc-list">
// // //                       {plcs.map((plc) => (
// // //                         <option
// // //                           key={plc.laborCategoryCode}
// // //                           value={plc.laborCategoryCode}
// // //                         >
// // //                           {plc.description}
// // //                         </option>
// // //                       ))}
// // //                     </datalist>
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/10">
// // //                     {plcs.find(
// // //                       (plc) => plc.laborCategoryCode === newEmployeeRate.plc
// // //                     )?.description || ""}
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/10">
// // //                     <input
// // //                       type="text"
// // //                       value={newEmployeeRate.billRate || ""}
// // //                       onChange={(e) =>
// // //                         handleNewEmployeeRateChange("billRate", e.target.value)
// // //                       }
// // //                       className="w-full p-1 border rounded text-xs"
// // //                     />
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/10">
// // //                     <select
// // //                       value={newEmployeeRate.rateType}
// // //                       onChange={(e) =>
// // //                         handleNewEmployeeRateChange("rateType", e.target.value)
// // //                       }
// // //                       className="w-full p-1 border rounded text-xs"
// // //                     >
// // //                       {rateTypeOptions.map((option) => (
// // //                         <option key={option} value={option}>
// // //                           {option}
// // //                         </option>
// // //                       ))}
// // //                     </select>
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/10">
// // //                     <input
// // //                       type="date"
// // //                       value={newEmployeeRate.startDate || ""}
// // //                       onChange={(e) =>
// // //                         handleNewEmployeeRateChange("startDate", e.target.value)
// // //                       }
// // //                       className="w-full p-1 border rounded text-xs"
// // //                     />
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/10">
// // //                     <input
// // //                       type="date"
// // //                       value={newEmployeeRate.endDate || ""}
// // //                       onChange={(e) =>
// // //                         handleNewEmployeeRateChange("endDate", e.target.value)
// // //                       }
// // //                       className="w-full p-1 border rounded text-xs"
// // //                     />
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/10">
// // //                     <div className="flex flex-col sm:flex-row justify-center space-y-1 sm:space-y-0 sm:space-x-1">
// // //                       <button
// // //                         onClick={handleSaveNewEmployeeRate}
// // //                         className="bg-green-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-green-600 transition w-full sm:w-auto"
// // //                         disabled={loading}
// // //                       >
// // //                         Save
// // //                       </button>
// // //                       <button
// // //                         onClick={() => setNewEmployeeRate(null)}
// // //                         className="bg-gray-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-gray-600 transition w-full sm:w-auto"
// // //                         disabled={loading}
// // //                       >
// // //                         Cancel
// // //                       </button>
// // //                     </div>
// // //                   </td>
// // //                 </tr>
// // //               )}
// // //               <tr>
// // //                 <td colSpan="10" className="border p-1">
// // //                   <button
// // //                     onClick={handleAddEmployeeRow}
// // //                     className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-blue-600 transition"
// // //                     disabled={loading || newEmployeeRate}
// // //                   >
// // //                     Add
// // //                   </button>
// // //                 </td>
// // //               </tr>
// // //             </tbody>
// // //           </table>
// // //         </div>
// // //       </div>

// // //       {/* <div className="mb-4">
// // //         <h3 className="text-xs font-normal">Vendor Billing Rates Schedule</h3>
// // //         <div className="overflow-x-auto">
// // //           <table className="w-full text-xs border-collapse">
// // //             <thead>
// // //               <tr className="bg-gray-100">
// // //                 <th className="border p-1 font-normal">Lookup Type</th>
// // //                 <th className="border p-1 font-normal">Vendor</th>
// // //                 <th className="border p-1 font-normal">Vendor Name</th>
// // //                 <th className="border p-1 font-normal">Vendor Employee</th>
// // //                 <th className="border p-1 font-normal">Vendor Employee Name</th>
// // //                 <th className="border p-1 font-normal">PLC</th>
// // //                 <th className="border p-1 font-normal">PLC Description</th>
// // //                 <th className="border p-1 font-normal">Bill Rate</th>
// // //                 <th className="border p-1 font-normal">Rate Type</th>
// // //                 <th className="border p-1 font-normal">Start Date</th>
// // //                 <th className="border p-1 font-normal">End Date</th>
// // //                 <th className="border p-1 font-normal">Actions</th>
// // //               </tr>
// // //             </thead>
// // //             <tbody>
// // //               {loading ? (
// // //                 <tr><td colSpan="12" className="border p-1 text-center">Loading...</td></tr>
// // //               ) : vendorBillingRates.length === 0 ? (
// // //                 <tr><td colSpan="12" className="border p-1 text-center">No data available</td></tr>
// // //               ) : (
// // //                 vendorBillingRates.map((item) => (
// // //                   <tr key={item.id} className="sm:table-row flex flex-col sm:flex-row mb-1 sm:mb-0">
// // //                     <td className="border p-1 sm:w-1/12">
// // //                       <select
// // //                         value={item.lookupType}
// // //                         onChange={(e) => handleNewVendorRateChange('lookupType', e.target.value)}
// // //                         className="w-full p-1 border rounded text-xs"
// // //                       >
// // //                         {lookupTypeOptions.map(option => (
// // //                           <option key={option} value={option}>{option}</option>
// // //                         ))}
// // //                       </select>
// // //                     </td>
// // //                     <td className="border p-1 sm:w-1/12">{item.vendorId}</td>
// // //                     <td className="border p-1 sm:w-1/12">{item.vendorName}</td>
// // //                     <td className="border p-1 sm:w-1/12">{item.vendorEmployee}</td>
// // //                     <td className="border p-1 sm:w-1/12">{item.vendorEmployeeName}</td>
// // //                     <td className="border p-1 sm:w-1/12">
// // //                       <input
// // //                         type="text"
// // //                         value={item.plc}
// // //                         onChange={(e) => {
// // //                           setVendorBillingRates(prev => prev.map(rate =>
// // //                             rate.id === item.id
// // //                               ? { ...rate, plc: e.target.value }
// // //                               : rate
// // //                           ));
// // //                           setPlcSearch(e.target.value);
// // //                         }}
// // //                         className="w-full p-1 border rounded text-xs"
// // //                         list="plc-list"
// // //                       />
// // //                       <datalist id="plc-list">
// // //                         {plcs.map(plc => (
// // //                           <option key={plc.laborCategoryCode} value={plc.laborCategoryCode}>
// // //                             {plc.description}
// // //                           </option>
// // //                         ))}
// // //                       </datalist>
// // //                     </td>
// // //                     <td className="border p-1 sm:w-1/12">
// // //                       {plcs.find(plc => plc.laborCategoryCode === item.plc)?.description || item.plcDescription}
// // //                     </td>
// // //                     <td className="border p-1 sm:w-1/12">
// // //                       <input
// // //                         type="text"
// // //                         value={editVendorBillRate[item.id] || item.billRate}
// // //                         onChange={(e) => handleVendorBillRateChange(item.id, e.target.value)}
// // //                         className="w-full p-1 border rounded text-xs"
// // //                       />
// // //                     </td>
// // //                     <td className="border p-1 sm:w-1/12">
// // //                       <select
// // //                         value={item.rateType}
// // //                         onChange={(e) => setVendorBillingRates(prev => prev.map(rate =>
// // //                           rate.id === item.id
// // //                             ? { ...rate, rateType: e.target.value }
// // //                             : rate
// // //                         ))}
// // //                         className="w-full p-1 border rounded text-xs"
// // //                       >
// // //                         {rateTypeOptions.map(option => (
// // //                           <option key={option} value={option}>{option}</option>
// // //                         ))}
// // //                       </select>
// // //                     </td>
// // //                     <td className="border p-1 sm:w-1/12">
// // //                       <input
// // //                         type="date"
// // //                         value={item.startDate}
// // //                         onChange={(e) => setVendorBillingRates(prev => prev.map(rate =>
// // //                           rate.id === item.id
// // //                             ? { ...rate, startDate: e.target.value }
// // //                             : rate
// // //                         ))}
// // //                         className="w-full p-1 border rounded text-xs"
// // //                       />
// // //                     </td>
// // //                     <td className="border p-1 sm:w-1/12">
// // //                       <input
// // //                         type="date"
// // //                         value={item.endDate || ''}
// // //                         onChange={(e) => setVendorBillingRates(prev => prev.map(rate =>
// // //                           rate.id === item.id
// // //                             ? { ...rate, endDate: e.target.value }
// // //                             : rate
// // //                         ))}
// // //                         className="w-full p-1 border rounded text-xs"
// // //                       />
// // //                     </td>
// // //                     <td className="border p-1 sm:w-1/12">
// // //                       <div className="flex flex-col sm:flex-row justify-center space-y-1 sm:space-y-0 sm:space-x-1">
// // //                         <button
// // //                           onClick={() => handleUpdateVendor(item.id, { ...item, billRate: editVendorBillRate[item.id] || item.billRate })}
// // //                           className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-yellow-600 transition w-full sm:w-auto"
// // //                           disabled={loading}
// // //                         >
// // //                           Update
// // //                         </button>
// // //                         <button
// // //                           onClick={() => handleDeleteVendor(item.id)}
// // //                           className="bg-red-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-red-600 transition w-full sm:w-auto"
// // //                           disabled={loading}
// // //                         >
// // //                           Delete
// // //                         </button>
// // //                       </div>
// // //                     </td>
// // //                   </tr>
// // //                 ))
// // //               )}
// // //               {newVendorRate && (
// // //                 <tr className="sm:table-row flex flex-col sm:flex-row mb-1 sm:mb-0">
// // //                   <td className="border p-1 sm:w-1/12">
// // //                     <select
// // //                       value={newVendorRate.lookupType}
// // //                       onChange={(e) => handleNewVendorRateChange('lookupType', e.target.value)}
// // //                       className="w-full p-1 border rounded text-xs"
// // //                     >
// // //                       {lookupTypeOptions.map(option => (
// // //                         <option key={option} value={option}>{option}</option>
// // //                       ))}
// // //                     </select>
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/12">
// // //                     <input
// // //                       type="text"
// // //                       value={newVendorRate.vendorId || ''}
// // //                       onChange={(e) => handleNewVendorRateChange('vendorId', e.target.value)}
// // //                       className="w-full p-1 border rounded text-xs"
// // //                     />
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/12">
// // //                     <input
// // //                       type="text"
// // //                       value={newVendorRate.vendorName || ''}
// // //                       onChange={(e) => handleNewVendorRateChange('vendorName', e.target.value)}
// // //                       className="w-full p-1 border rounded text-xs"
// // //                     />
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/12">
// // //                     <input
// // //                       type="text"
// // //                       value={newVendorRate.vendorEmployee || ''}
// // //                       onChange={(e) => handleNewVendorRateChange('vendorEmployee', e.target.value)}
// // //                       className="w-full p-1 border rounded text-xs"
// // //                     />
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/12">
// // //                     <input
// // //                       type="text"
// // //                       value={newVendorRate.vendorEmployeeName || ''}
// // //                       onChange={(e) => handleNewVendorRateChange('vendorEmployeeName', e.target.value)}
// // //                       className="w-full p-1 border rounded text-xs"
// // //                     />
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/12">
// // //                     <input
// // //                       type="text"
// // //                       value={newVendorRate.plc || ''}
// // //                       onChange={(e) => {
// // //                         handleNewVendorRateChange('plc', e.target.value);
// // //                         setPlcSearch(e.target.value);
// // //                       }}
// // //                       className="w-full p-1 border rounded text-xs"
// // //                       list="plc-list"
// // //                     />
// // //                     <datalist id="plc-list">
// // //                       {plcs.map(plc => (
// // //                         <option key={plc.laborCategoryCode} value={plc.laborCategoryCode}>
// // //                           {plc.description}
// // //                         </option>
// // //                       ))}
// // //                     </datalist>
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/12">
// // //                     {plcs.find(plc => plc.laborCategoryCode === newVendorRate.plc)?.description || ''}
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/12">
// // //                     <input
// // //                       type="text"
// // //                       value={newVendorRate.billRate || ''}
// // //                       onChange={(e) => handleNewVendorRateChange('billRate', e.target.value)}
// // //                       className="w-full p-1 border rounded text-xs"
// // //                     />
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/12">
// // //                     <select
// // //                       value={newVendorRate.rateType}
// // //                       onChange={(e) => handleNewVendorRateChange('rateType', e.target.value)}
// // //                       className="w-full p-1 border rounded text-xs"
// // //                     >
// // //                       {rateTypeOptions.map(option => (
// // //                         <option key={option} value={option}>{option}</option>
// // //                       ))}
// // //                     </select>
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/12">
// // //                     <input
// // //                       type="date"
// // //                       value={newVendorRate.startDate || ''}
// // //                       onChange={(e) => handleNewVendorRateChange('startDate', e.target.value)}
// // //                       className="w-full p-1 border rounded text-xs"
// // //                     />
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/12">
// // //                     <input
// // //                       type="date"
// // //                       value={newVendorRate.endDate || ''}
// // //                       onChange={(e) => handleNewVendorRateChange('endDate', e.target.value)}
// // //                       className="w-full p-1 border rounded text-xs"
// // //                     />
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/12">
// // //                     <div className="flex flex-col sm:flex-row justify-center space-y-1 sm:space-y-0 sm:space-x-1">
// // //                       <button
// // //                         onClick={handleSaveNewVendorRate}
// // //                         className="bg-green-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-green-600 transition w-full sm:w-auto"
// // //                         disabled={loading}
// // //                       >
// // //                         Save
// // //                       </button>
// // //                       <button
// // //                         onClick={() => setNewVendorRate(null)}
// // //                         className="bg-gray-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-gray-600 transition w-full sm:w-auto"
// // //                         disabled={loading}
// // //                       >
// // //                         Cancel
// // //                       </button>
// // //                     </div>
// // //                   </td>
// // //                 </tr>
// // //               )}
// // //               <tr>
// // //                 <td colSpan="12" className="border p-1">
// // //                   <button
// // //                     onClick={handleAddVendorRow}
// // //                     className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-blue-600 transition"
// // //                     disabled={loading || newVendorRate}
// // //                   >
// // //                     Add
// // //                   </button>
// // //                 </td>
// // //               </tr>
// // //             </tbody>
// // //           </table>
// // //         </div>
// // //       </div> */}
// // //       <div className="mb-4">
// // //         <h3 className="text-xs font-normal">Vendor Billing Rates Schedule</h3>
// // //         <div className="overflow-x-auto">
// // //           <table className="w-full text-xs border-collapse">
// // //             <thead>
// // //               <tr className="bg-gray-100">
// // //                 <th className="border p-1 font-normal">Lookup Type</th>
// // //                 <th className="border p-1 font-normal">Vendor</th>
// // //                 <th className="border p-1 font-normal">Vendor Name</th>
// // //                 <th className="border p-1 font-normal">Vendor Employee</th>
// // //                 <th className="border p-1 font-normal">Vendor Employee Name</th>
// // //                 <th className="border p-1 font-normal">PLC</th>
// // //                 <th className="border p-1 font-normal">PLC Description</th>
// // //                 <th className="border p-1 font-normal">Bill Rate</th>
// // //                 <th className="border p-1 font-normal">Rate Type</th>
// // //                 <th className="border p-1 font-normal">Start Date</th>
// // //                 <th className="border p-1 font-normal">End Date</th>
// // //                 <th className="border p-1 font-normal">Actions</th>
// // //               </tr>
// // //             </thead>
// // //             <tbody>
// // //               {loading ? (
// // //                 <tr>
// // //                   <td colSpan="12" className="border p-1 text-center">
// // //                     Loading...
// // //                   </td>
// // //                 </tr>
// // //               ) : vendorBillingRates.length === 0 ? (
// // //                 <tr>
// // //                   <td colSpan="12" className="border p-1 text-center">
// // //                     No data available
// // //                   </td>
// // //                 </tr>
// // //               ) : (
// // //                 vendorBillingRates.map((item) => (
// // //                   <tr
// // //                     key={item.id}
// // //                     className="sm:table-row flex flex-col sm:flex-row mb-1 sm:mb-0"
// // //                   >
// // //                     <td className="border p-1 sm:w-1/12">
// // //                       <select
// // //                         value={item.lookupType}
// // //                         onChange={(e) =>
// // //                           setVendorBillingRates((prev) =>
// // //                             prev.map((rate) =>
// // //                               rate.id === item.id
// // //                                 ? { ...rate, lookupType: e.target.value }
// // //                                 : rate
// // //                             )
// // //                           )
// // //                         }
// // //                         className="w-full p-1 border rounded text-xs"
// // //                       >
// // //                         {lookupTypeOptions.map((option) => (
// // //                           <option key={option} value={option}>
// // //                             {option}
// // //                           </option>
// // //                         ))}
// // //                       </select>
// // //                     </td>
// // //                     <td className="border p-1 sm:w-1/12">
// // //                       <input
// // //                         type="text"
// // //                         value={item.vendorId}
// // //                         onChange={(e) =>
// // //                           setVendorBillingRates((prev) =>
// // //                             prev.map((rate) =>
// // //                               rate.id === item.id
// // //                                 ? { ...rate, vendorId: e.target.value }
// // //                                 : rate
// // //                             )
// // //                           )
// // //                         }
// // //                         className="w-full p-1 border rounded text-xs"
// // //                       />
// // //                     </td>
// // //                     <td className="border p-1 sm:w-1/12">
// // //                       <input
// // //                         type="text"
// // //                         value={item.vendorName}
// // //                         onChange={(e) =>
// // //                           setVendorBillingRates((prev) =>
// // //                             prev.map((rate) =>
// // //                               rate.id === item.id
// // //                                 ? { ...rate, vendorName: e.target.value }
// // //                                 : rate
// // //                             )
// // //                           )
// // //                         }
// // //                         className="w-full p-1 border rounded text-xs"
// // //                       />
// // //                     </td>
// // //                     <td className="border p-1 sm:w-1/12">
// // //                       <input
// // //                         type="text"
// // //                         value={item.vendorEmployee}
// // //                         onChange={(e) =>
// // //                           setVendorBillingRates((prev) =>
// // //                             prev.map((rate) =>
// // //                               rate.id === item.id
// // //                                 ? { ...rate, vendorEmployee: e.target.value }
// // //                                 : rate
// // //                             )
// // //                           )
// // //                         }
// // //                         className="w-full p-1 border rounded text-xs"
// // //                       />
// // //                     </td>
// // //                     <td className="border p-1 sm:w-1/12">
// // //                       <input
// // //                         type="text"
// // //                         value={item.vendorEmployeeName}
// // //                         onChange={(e) =>
// // //                           setVendorBillingRates((prev) =>
// // //                             prev.map((rate) =>
// // //                               rate.id === item.id
// // //                                 ? {
// // //                                     ...rate,
// // //                                     vendorEmployeeName: e.target.value,
// // //                                   }
// // //                                 : rate
// // //                             )
// // //                           )
// // //                         }
// // //                         className="w-full p-1 border rounded text-xs"
// // //                       />
// // //                     </td>
// // //                     <td className="border p-1 sm:w-1/12">
// // //                       <input
// // //                         type="text"
// // //                         value={item.plc}
// // //                         onChange={(e) => {
// // //                           setVendorBillingRates((prev) =>
// // //                             prev.map((rate) =>
// // //                               rate.id === item.id
// // //                                 ? { ...rate, plc: e.target.value }
// // //                                 : rate
// // //                             )
// // //                           );
// // //                           setPlcSearch(e.target.value);
// // //                         }}
// // //                         className="w-full p-1 border rounded text-xs"
// // //                         list="plc-list"
// // //                       />
// // //                       <datalist id="plc-list">
// // //                         {plcs.map((plc) => (
// // //                           <option
// // //                             key={plc.laborCategoryCode}
// // //                             value={plc.laborCategoryCode}
// // //                           >
// // //                             {plc.description}
// // //                           </option>
// // //                         ))}
// // //                       </datalist>
// // //                     </td>
// // //                     <td className="border p-1 sm:w-1/12">
// // //                       {plcs.find((plc) => plc.laborCategoryCode === item.plc)
// // //                         ?.description || item.plcDescription}
// // //                     </td>
// // //                     <td className="border p-1 sm:w-1/12">
// // //                       <input
// // //                         type="text"
// // //                         value={editVendorBillRate[item.id] || item.billRate}
// // //                         onChange={(e) =>
// // //                           handleVendorBillRateChange(item.id, e.target.value)
// // //                         }
// // //                         className="w-full p-1 border rounded text-xs"
// // //                       />
// // //                     </td>
// // //                     <td className="border p-1 sm:w-1/12">
// // //                       <select
// // //                         value={item.rateType}
// // //                         onChange={(e) =>
// // //                           setVendorBillingRates((prev) =>
// // //                             prev.map((rate) =>
// // //                               rate.id === item.id
// // //                                 ? { ...rate, rateType: e.target.value }
// // //                                 : rate
// // //                             )
// // //                           )
// // //                         }
// // //                         className="w-full p-1 border rounded text-xs"
// // //                       >
// // //                         {rateTypeOptions.map((option) => (
// // //                           <option key={option} value={option}>
// // //                             {option}
// // //                           </option>
// // //                         ))}
// // //                       </select>
// // //                     </td>
// // //                     <td className="border p-1 sm:w-1/12">
// // //                       <input
// // //                         type="date"
// // //                         value={item.startDate}
// // //                         onChange={(e) =>
// // //                           setVendorBillingRates((prev) =>
// // //                             prev.map((rate) =>
// // //                               rate.id === item.id
// // //                                 ? { ...rate, startDate: e.target.value }
// // //                                 : rate
// // //                             )
// // //                           )
// // //                         }
// // //                         className="w-full p-1 border rounded text-xs"
// // //                       />
// // //                     </td>
// // //                     <td className="border p-1 sm:w-1/12">
// // //                       <input
// // //                         type="date"
// // //                         value={item.endDate || ""}
// // //                         onChange={(e) =>
// // //                           setVendorBillingRates((prev) =>
// // //                             prev.map((rate) =>
// // //                               rate.id === item.id
// // //                                 ? { ...rate, endDate: e.target.value }
// // //                                 : rate
// // //                             )
// // //                           )
// // //                         }
// // //                         className="w-full p-1 border rounded text-xs"
// // //                       />
// // //                     </td>
// // //                     <td className="border p-1 sm:w-1/12">
// // //                       <div className="flex flex-col sm:flex-row justify-center space-y-1 sm:space-y-0 sm:space-x-1">
// // //                         <button
// // //                           onClick={() =>
// // //                             handleUpdateVendor(item.id, {
// // //                               ...item,
// // //                               billRate:
// // //                                 editVendorBillRate[item.id] || item.billRate,
// // //                             })
// // //                           }
// // //                           className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-yellow-600 transition w-full sm:w-auto"
// // //                           disabled={loading}
// // //                         >
// // //                           Update
// // //                         </button>
// // //                         <button
// // //                           onClick={() => handleDeleteVendor(item.id)}
// // //                           className="bg-red-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-red-600 transition w-full sm:w-auto"
// // //                           disabled={loading}
// // //                         >
// // //                           Delete
// // //                         </button>
// // //                       </div>
// // //                     </td>
// // //                   </tr>
// // //                 ))
// // //               )}
// // //               {newVendorRate && (
// // //                 <tr className="sm:table-row flex flex-col sm:flex-row mb-1 sm:mb-0">
// // //                   <td className="border p-1 sm:w-1/12">
// // //                     <select
// // //                       value={newVendorRate.lookupType}
// // //                       onChange={(e) =>
// // //                         handleNewVendorRateChange("lookupType", e.target.value)
// // //                       }
// // //                       className="w-full p-1 border rounded text-xs"
// // //                     >
// // //                       {lookupTypeOptions.map((option) => (
// // //                         <option key={option} value={option}>
// // //                           {option}
// // //                         </option>
// // //                       ))}
// // //                     </select>
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/12">
// // //                     <input
// // //                       type="text"
// // //                       value={newVendorRate.vendorId || ""}
// // //                       onChange={(e) =>
// // //                         handleNewVendorRateChange("vendorId", e.target.value)
// // //                       }
// // //                       className="w-full p-1 border rounded text-xs"
// // //                     />
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/12">
// // //                     <input
// // //                       type="text"
// // //                       value={newVendorRate.vendorName || ""}
// // //                       onChange={(e) =>
// // //                         handleNewVendorRateChange("vendorName", e.target.value)
// // //                       }
// // //                       className="w-full p-1 border rounded text-xs"
// // //                     />
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/12">
// // //                     <input
// // //                       type="text"
// // //                       value={newVendorRate.vendorEmployee || ""}
// // //                       onChange={(e) =>
// // //                         handleNewVendorRateChange(
// // //                           "vendorEmployee",
// // //                           e.target.value
// // //                         )
// // //                       }
// // //                       className="w-full p-1 border rounded text-xs"
// // //                     />
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/12">
// // //                     <input
// // //                       type="text"
// // //                       value={newVendorRate.vendorEmployeeName || ""}
// // //                       onChange={(e) =>
// // //                         handleNewVendorRateChange(
// // //                           "vendorEmployeeName",
// // //                           e.target.value
// // //                         )
// // //                       }
// // //                       className="w-full p-1 border rounded text-xs"
// // //                     />
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/12">
// // //                     <input
// // //                       type="text"
// // //                       value={newVendorRate.plc || ""}
// // //                       onChange={(e) => {
// // //                         handleNewVendorRateChange("plc", e.target.value);
// // //                         setPlcSearch(e.target.value);
// // //                       }}
// // //                       className="w-full p-1 border rounded text-xs"
// // //                       list="plc-list"
// // //                     />
// // //                     <datalist id="plc-list">
// // //                       {plcs.map((plc) => (
// // //                         <option
// // //                           key={plc.laborCategoryCode}
// // //                           value={plc.laborCategoryCode}
// // //                         >
// // //                           {plc.description}
// // //                         </option>
// // //                       ))}
// // //                     </datalist>
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/12">
// // //                     {plcs.find(
// // //                       (plc) => plc.laborCategoryCode === newVendorRate.plc
// // //                     )?.description || ""}
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/12">
// // //                     <input
// // //                       type="text"
// // //                       value={newVendorRate.billRate || ""}
// // //                       onChange={(e) =>
// // //                         handleNewVendorRateChange("billRate", e.target.value)
// // //                       }
// // //                       className="w-full p-1 border rounded text-xs"
// // //                     />
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/12">
// // //                     <select
// // //                       value={newVendorRate.rateType}
// // //                       onChange={(e) =>
// // //                         handleNewVendorRateChange("rateType", e.target.value)
// // //                       }
// // //                       className="w-full p-1 border rounded text-xs"
// // //                     >
// // //                       {rateTypeOptions.map((option) => (
// // //                         <option key={option} value={option}>
// // //                           {option}
// // //                         </option>
// // //                       ))}
// // //                     </select>
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/12">
// // //                     <input
// // //                       type="date"
// // //                       value={newVendorRate.startDate || ""}
// // //                       onChange={(e) =>
// // //                         handleNewVendorRateChange("startDate", e.target.value)
// // //                       }
// // //                       className="w-full p-1 border rounded text-xs"
// // //                     />
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/12">
// // //                     <input
// // //                       type="date"
// // //                       value={newVendorRate.endDate || ""}
// // //                       onChange={(e) =>
// // //                         handleNewVendorRateChange("endDate", e.target.value)
// // //                       }
// // //                       className="w-full p-1 border rounded text-xs"
// // //                     />
// // //                   </td>
// // //                   <td className="border p-1 sm:w-1/12">
// // //                     <div className="flex flex-col sm:flex-row justify-center space-y-1 sm:space-y-0 sm:space-x-1">
// // //                       <button
// // //                         onClick={handleSaveNewVendorRate}
// // //                         className="bg-green-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-green-600 transition w-full sm:w-auto"
// // //                         disabled={loading}
// // //                       >
// // //                         Save
// // //                       </button>
// // //                       <button
// // //                         onClick={() => setNewVendorRate(null)}
// // //                         className="bg-gray-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-gray-600 transition w-full sm:w-auto"
// // //                         disabled={loading}
// // //                       >
// // //                         Cancel
// // //                       </button>
// // //                     </div>
// // //                   </td>
// // //                 </tr>
// // //               )}
// // //               <tr>
// // //                 <td colSpan="12" className="border p-1">
// // //                   <button
// // //                     onClick={handleAddVendorRow}
// // //                     className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-blue-600 transition"
// // //                     disabled={loading || newVendorRate}
// // //                   >
// // //                     Add
// // //                   </button>
// // //                 </td>
// // //               </tr>
// // //             </tbody>
// // //           </table>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default PLCComponent;

// // import React, { useState, useEffect } from "react";
// // import axios from "axios";

// // const PLCComponent = ({ selectedProjectId, selectedPlan }) => {
// //   const [billingRatesSchedule, setBillingRatesSchedule] = useState([]);
// //   const [newRate, setNewRate] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [editBillRate, setEditBillRate] = useState({});
// //   const [employees, setEmployees] = useState([]);
// //   const [employeeBillingRates, setEmployeeBillingRates] = useState([]);
// //   const [newEmployeeRate, setNewEmployeeRate] = useState(null);
// //   const [editEmployeeBillRate, setEditEmployeeBillRate] = useState({});
// //   const [vendorBillingRates, setVendorBillingRates] = useState([]);
// //   const [newVendorRate, setNewVendorRate] = useState(null);
// //   const [editVendorBillRate, setEditVendorBillRate] = useState({});
// //   const [plcs, setPlcs] = useState([]);
// //   const [plcSearch, setPlcSearch] = useState("");

// //   const lookupTypeOptions = ["Select", "Employee", "Contract Vendor"];
// //   const rateTypeOptions = ["Select", "Billing", "Actual"];

// //   // Fetch billing rates schedule based on selected project ID
// //   useEffect(() => {
// //     const fetchBillingRates = async () => {
// //       if (!selectedProjectId) return;
// //       setLoading(true);
// //       try {
// //         const response = await axios.get(
// //           `https://test-api-3tmq.onrender.com/api/ProjectPlcRates`
// //         );
// //         const filteredData = response.data.filter((item) =>
// //           item.projId.toLowerCase().startsWith(selectedProjectId.toLowerCase())
// //         );
// //         setBillingRatesSchedule(
// //           filteredData.map((item) => ({
// //             id: item.id,
// //             plc: item.laborCategoryCode,
// //             billRate: item.billingRate,
// //             rateType: item.rateType || "Select",
// //             startDate: item.effectiveDate
// //               ? item.effectiveDate.split("T")[0]
// //               : "",
// //             endDate: item.endDate ? item.endDate.split("T")[0] : null,
// //           }))
// //         );
// //         const newEditBillRate = {};
// //         filteredData.forEach((item) => {
// //           newEditBillRate[item.id] = item.billingRate;
// //         });
// //         setEditBillRate(newEditBillRate);
// //       } catch (error) {
// //         console.error("Error fetching billing rates:", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchBillingRates();
// //   }, [selectedProjectId]);

// //   // Fetch employees for the selected project
// //   useEffect(() => {
// //     const fetchEmployees = async () => {
// //       if (
// //         !selectedProjectId ||
// //         typeof selectedProjectId !== "string" ||
// //         selectedProjectId.trim() === ""
// //       ) {
// //         setEmployees([]);
// //         return;
// //       }
// //       setLoading(true);
// //       try {
// //         const response = await axios.get(
// //           `https://test-api-3tmq.onrender.com/Project/GetEmployeesByProject/${selectedProjectId}`
// //         );
// //         setEmployees(
// //           response.data.map((item) => ({
// //             empId: item.empId,
// //             employeeName: item.employeeName,
// //           }))
// //         );
// //       } catch (error) {
// //         console.error("Error fetching employees:", error);
// //         setEmployees([]);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchEmployees();
// //   }, [selectedProjectId]);

// //   // Fetch PLCs for search
// //   useEffect(() => {
// //     const fetchPlcs = async () => {
// //       if (!plcSearch) return;
// //       try {
// //         const response = await axios.get(
// //           `https://test-api-3tmq.onrender.com/Project/GetAllPlcs/${plcSearch}`
// //         );
// //         const filteredPlcs = response.data
// //           .filter((item) =>
// //             item.laborCategoryCode
// //               .toLowerCase()
// //               .includes(plcSearch.toLowerCase())
// //           )
// //           .map((item) => ({
// //             laborCategoryCode: item.laborCategoryCode,
// //             description: item.description || "",
// //           }));
// //         setPlcs(filteredPlcs);
// //       } catch (error) {
// //         console.error("Error fetching PLCs:", error);
// //       }
// //     };
// //     fetchPlcs();
// //   }, [plcSearch]);

// //   // Fetch employee billing rates
// //   useEffect(() => {
// //     const fetchEmployeeBillingRates = async () => {
// //       if (!selectedProjectId) return;
// //       setLoading(true);
// //       try {
// //         const response = await axios.get(
// //           `https://test-api-3tmq.onrender.com/ProjEmplRt`
// //         );
// //         const filteredData = response.data.filter(
// //           (item) =>
// //             item.projId
// //               .toLowerCase()
// //               .startsWith(selectedProjectId.toLowerCase()) && item.emplId
// //         );
// //         setEmployeeBillingRates(
// //           filteredData.map((item) => ({
// //             id: item.id,
// //             lookupType: item.lookupType || "Select",
// //             empId: item.emplId,
// //             employeeName:
// //               item.employeeName ||
// //               employees.find((emp) => emp.empId === item.emplId)
// //                 ?.employeeName ||
// //               "",
// //             plc: item.billLabCatCd,
// //             plcDescription: item.description || "",
// //             billRate: item.billRtAmt,
// //             rateType: item.sBillRtTypeCd || "Select",
// //             startDate: item.startDt ? item.startDt.split("T")[0] : "",
// //             endDate: item.endDt ? item.endDt.split("T")[0] : null,
// //           }))
// //         );
// //         const newEditEmployeeBillRate = {};
// //         filteredData.forEach((item) => {
// //           newEditEmployeeBillRate[item.id] = item.billRtAmt;
// //         });
// //         setEditEmployeeBillRate(newEditEmployeeBillRate);
// //       } catch (error) {
// //         console.error("Error fetching employee billing rates:", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchEmployeeBillingRates();
// //   }, [selectedProjectId, employees]);

// //   // Fetch vendor billing rates
// //   useEffect(() => {
// //     const fetchVendorBillingRates = async () => {
// //       if (!selectedProjectId) return;
// //       setLoading(true);
// //       try {
// //         const response = await axios.get(
// //           `https://test-api-3tmq.onrender.com/ProjVendRt`
// //         );
// //         const filteredData = response.data.filter((item) =>
// //           item.projId.toLowerCase().startsWith(selectedProjectId.toLowerCase())
// //         );
// //         setVendorBillingRates(
// //           filteredData.map((item) => ({
// //             id: item.id,
// //             lookupType: item.lookupType || "Select",
// //             vendorId: item.vendId || "",
// //             vendorName: item.vendorName || "",
// //             vendorEmployee: item.vendEmplId || "",
// //             vendorEmployeeName: item.vendEmplName || "",
// //             plc: item.billLabCatCd,
// //             plcDescription: item.description || "",
// //             billRate: item.billRtAmt,
// //             rateType: item.sBillRtTypeCd || "Select",
// //             startDate: new Date(item.startDt).toISOString().split("T")[0],
// //             endDate: item.endDt
// //               ? new Date(item.endDt).toISOString().split("T")[0]
// //               : null,
// //           }))
// //         );
// //         const newEditVendorBillRate = {};
// //         filteredData.forEach((item) => {
// //           newEditVendorBillRate[item.id] = item.billRtAmt;
// //         });
// //         setEditVendorBillRate(newEditVendorBillRate);
// //       } catch (error) {
// //         console.error("Error fetching vendor billing rates:", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchVendorBillingRates();
// //   }, [selectedProjectId]);

// //   const handleUpdate = async (id, updatedData) => {
// //     setLoading(true);
// //     try {
// //       await axios.put(
// //         `https://test-api-3tmq.onrender.com/api/ProjectPlcRates/${id}`,
// //         {
// //           id,
// //           projId: selectedProjectId,
// //           laborCategoryCode: updatedData.plc,
// //           costRate: parseFloat(updatedData.billRate) * 0.65,
// //           billingRate: parseFloat(updatedData.billRate),
// //           effectiveDate: updatedData.startDate,
// //           endDate: updatedData.endDate || null,
// //           rateType: updatedData.rateType,
// //           isActive: true,
// //           modifiedBy: "admin",
// //           createdAt: new Date().toISOString(),
// //           updatedAt: new Date().toISOString(),
// //         }
// //       );
// //       const fetchResponse = await axios.get(
// //         `https://test-api-3tmq.onrender.com/api/ProjectPlcRates`
// //       );
// //       const filteredData = fetchResponse.data.filter((item) =>
// //         item.projId.toLowerCase().startsWith(selectedProjectId.toLowerCase())
// //       );
// //       setBillingRatesSchedule(
// //         filteredData.map((item) => ({
// //           id: item.id,
// //           plc: item.laborCategoryCode,
// //           billRate: item.billingRate,
// //           rateType: item.rateType || "Select",
// //           startDate: item.effectiveDate ? item.effectiveDate.split("T")[0] : "",
// //           endDate: item.endDate ? item.endDate.split("T")[0] : null,
// //         }))
// //       );
// //       setEditBillRate((prev) => ({ ...prev, [id]: updatedData.billRate }));
// //     } catch (error) {
// //       console.error("Error updating billing rate:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleDelete = async (id) => {
// //     setLoading(true);
// //     try {
// //       await axios.delete(
// //         `https://test-api-3tmq.onrender.com/api/ProjectPlcRates/${id}`
// //       );
// //       const response = await axios.get(
// //         `https://test-api-3tmq.onrender.com/api/ProjectPlcRates`
// //       );
// //       const filteredData = response.data.filter((item) =>
// //         item.projId.toLowerCase().startsWith(selectedProjectId.toLowerCase())
// //       );
// //       setBillingRatesSchedule(
// //         filteredData.map((item) => ({
// //           id: item.id,
// //           plc: item.laborCategoryCode,
// //           billRate: item.billingRate,
// //           rateType: item.rateType || "Select",
// //           startDate: item.effectiveDate ? item.effectiveDate.split("T")[0] : "",
// //           endDate: item.endDate ? item.endDate.split("T")[0] : null,
// //         }))
// //       );
// //       setEditBillRate((prev) => {
// //         const newEditBillRate = { ...prev };
// //         delete newEditBillRate[id];
// //         return newEditBillRate;
// //       });
// //     } catch (error) {
// //       console.error("Error deleting billing rate:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleAddRow = () => {
// //     setNewRate({
// //       plc: "",
// //       billRate: "",
// //       rateType: "Select",
// //       startDate: "",
// //       endDate: "",
// //     });
// //   };

// //   const handleSaveNewRate = async () => {
// //     if (!newRate || !newRate.plc || !newRate.startDate || !newRate.billRate) {
// //       console.error(
// //         "Please fill all required fields (PLC, Bill Rate, Start Date)"
// //       );
// //       return;
// //     }
// //     setLoading(true);
// //     try {
// //       await axios.post(
// //         `https://test-api-3tmq.onrender.com/api/ProjectPlcRates`,
// //         {
// //           id: 0,
// //           projId: selectedProjectId,
// //           laborCategoryCode: newRate.plc,
// //           costRate: parseFloat(newRate.billRate) * 0.65,
// //           billingRate: parseFloat(newRate.billRate),
// //           effectiveDate: newRate.startDate,
// //           endDate: newRate.endDate || null,
// //           rateType: newRate.rateType,
// //           isActive: true,
// //           modifiedBy: "admin",
// //           createdAt: new Date().toISOString(),
// //           updatedAt: new Date().toISOString(),
// //         }
// //       );
// //       setNewRate(null);
// //       const fetchResponse = await axios.get(
// //         `https://test-api-3tmq.onrender.com/api/ProjectPlcRates`
// //       );
// //       const filteredData = fetchResponse.data.filter((item) =>
// //         item.projId.toLowerCase().startsWith(selectedProjectId.toLowerCase())
// //       );
// //       setBillingRatesSchedule(
// //         filteredData.map((item) => ({
// //           id: item.id,
// //           plc: item.laborCategoryCode,
// //           billRate: item.billingRate,
// //           rateType: item.rateType || "Select",
// //           startDate: item.effectiveDate ? item.effectiveDate.split("T")[0] : "",
// //           endDate: item.endDate ? item.endDate.split("T")[0] : null,
// //         }))
// //       );
// //     } catch (error) {
// //       console.error(
// //         "Error adding billing rate:",
// //         error.response ? error.response.data : error.message
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleNewRateChange = (field, value) => {
// //     setNewRate((prev) => ({ ...prev, [field]: value }));
// //   };

// //   const handleBillRateChange = (id, value) => {
// //     setEditBillRate((prev) => ({
// //       ...prev,
// //       [id]: value === "" ? "" : parseFloat(value) || 0,
// //     }));
// //   };

// //   // Employee Billing Rates Handlers
// //   const handleAddEmployeeRow = () => {
// //     setNewEmployeeRate({
// //       lookupType: "Select",
// //       empId: "",
// //       employeeName: "",
// //       plc: "",
// //       billRate: "",
// //       rateType: "Select",
// //       startDate: "",
// //       endDate: "",
// //     });
// //   };

// //   const handleSaveNewEmployeeRate = async () => {
// //     if (
// //       !newEmployeeRate ||
// //       !newEmployeeRate.empId ||
// //       !newEmployeeRate.plc ||
// //       !newEmployeeRate.startDate ||
// //       !newEmployeeRate.billRate
// //     ) {
// //       console.error(
// //         "Please fill all required fields (Employee, PLC, Bill Rate, Start Date)"
// //       );
// //       return;
// //     }
// //     setLoading(true);
// //     try {
// //       await axios.post(`https://test-api-3tmq.onrender.com/ProjEmplRt`, {
// //         id: 0,
// //         projId: selectedProjectId,
// //         emplId: newEmployeeRate.empId,
// //         employeeName: newEmployeeRate.employeeName,
// //         billLabCatCd: newEmployeeRate.plc,
// //         billRtAmt: parseFloat(newEmployeeRate.billRate),
// //         startDt: newEmployeeRate.startDate,
// //         endDt: newEmployeeRate.endDate || null,
// //         sBillRtTypeCd: newEmployeeRate.rateType,
// //         lookupType: newEmployeeRate.lookupType,
// //         isActive: true,
// //         modifiedBy: "admin",
// //       });
// //       setNewEmployeeRate(null);
// //       const fetchResponse = await axios.get(
// //         `https://test-api-3tmq.onrender.com/ProjEmplRt`
// //       );
// //       const filteredData = fetchResponse.data.filter(
// //         (item) =>
// //           item.projId
// //             .toLowerCase()
// //             .startsWith(selectedProjectId.toLowerCase()) && item.emplId
// //       );
// //       setEmployeeBillingRates(
// //         filteredData.map((item) => ({
// //           id: item.id,
// //           lookupType: item.lookupType || "Select",
// //           empId: item.emplId,
// //           employeeName:
// //             item.employeeName ||
// //             employees.find((emp) => emp.empId === item.emplId)?.employeeName ||
// //             "",
// //           plc: item.billLabCatCd,
// //           plcDescription: item.description || "",
// //           billRate: item.billRtAmt,
// //           rateType: item.sBillRtTypeCd || "Select",
// //           startDate: item.startDt ? item.startDt.split("T")[0] : "",
// //           endDate: item.endDt ? item.endDt.split("T")[0] : null,
// //         }))
// //       );
// //     } catch (error) {
// //       console.error(
// //         "Error adding employee billing rate:",
// //         error.response ? error.response.data : error.message
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleEmployeeBillRateChange = (id, value) => {
// //     setEditEmployeeBillRate((prev) => ({
// //       ...prev,
// //       [id]: value === "" ? "" : parseFloat(value) || 0,
// //     }));
// //   };

// //   const handleUpdateEmployee = async (id, updatedData) => {
// //     setLoading(true);
// //     try {
// //       await axios.put(`https://test-api-3tmq.onrender.com/ProjEmplRt/${id}`, {
// //         id,
// //         projId: selectedProjectId,
// //         emplId: updatedData.empId,
// //         employeeName: updatedData.employeeName,
// //         billLabCatCd: updatedData.plc,
// //         billRtAmt: parseFloat(updatedData.billRate),
// //         startDt: updatedData.startDate,
// //         endDt: updatedData.endDate || null,
// //         sBillRtTypeCd: updatedData.rateType,
// //         lookupType: updatedData.lookupType,
// //         isActive: true,
// //         modifiedBy: "admin",
// //       });
// //       const fetchResponse = await axios.get(
// //         `https://test-api-3tmq.onrender.com/ProjEmplRt`
// //       );
// //       const filteredData = fetchResponse.data.filter(
// //         (item) =>
// //           item.projId
// //             .toLowerCase()
// //             .startsWith(selectedProjectId.toLowerCase()) && item.emplId
// //       );
// //       setEmployeeBillingRates(
// //         filteredData.map((item) => ({
// //           id: item.id,
// //           lookupType: item.lookupType || "Select",
// //           empId: item.emplId,
// //           employeeName:
// //             item.employeeName ||
// //             employees.find((emp) => emp.empId === item.emplId)?.employeeName ||
// //             "",
// //           plc: item.billLabCatCd,
// //           plcDescription: item.description || "",
// //           billRate: item.billRtAmt,
// //           rateType: item.sBillRtTypeCd || "Select",
// //           startDate: item.startDt ? item.startDt.split("T")[0] : "",
// //           endDate: item.endDt ? item.endDt.split("T")[0] : null,
// //         }))
// //       );
// //       setEditEmployeeBillRate((prev) => ({
// //         ...prev,
// //         [id]: updatedData.billRate,
// //       }));
// //     } catch (error) {
// //       console.error("Error updating employee billing rate:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleDeleteEmployee = async (id) => {
// //     setLoading(true);
// //     try {
// //       await axios.delete(`https://test-api-3tmq.onrender.com/ProjEmplRt/${id}`);
// //       const response = await axios.get(
// //         `https://test-api-3tmq.onrender.com/ProjEmplRt`
// //       );
// //       const filteredData = response.data.filter(
// //         (item) =>
// //           item.projId
// //             .toLowerCase()
// //             .startsWith(selectedProjectId.toLowerCase()) && item.emplId
// //       );
// //       setEmployeeBillingRates(
// //         filteredData.map((item) => ({
// //           id: item.id,
// //           lookupType: item.lookupType || "Select",
// //           empId: item.emplId,
// //           employeeName:
// //             item.employeeName ||
// //             employees.find((emp) => emp.empId === item.emplId)?.employeeName ||
// //             "",
// //           plc: item.billLabCatCd,
// //           plcDescription: item.description || "",
// //           billRate: item.billRtAmt,
// //           rateType: item.sBillRtTypeCd || "Select",
// //           startDate: item.startDt ? item.startDt.split("T")[0] : "",
// //           endDate: item.endDt ? item.endDt.split("T")[0] : null,
// //         }))
// //       );
// //       setEditEmployeeBillRate((prev) => {
// //         const newEditEmployeeBillRate = { ...prev };
// //         delete newEditEmployeeBillRate[id];
// //         return newEditEmployeeBillRate;
// //       });
// //     } catch (error) {
// //       console.error("Error deleting employee billing rate:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleNewEmployeeRateChange = (field, value, id = null) => {
// //     if (id) {
// //       const selectedEmp =
// //         field === "empId" ? employees.find((emp) => emp.empId === value) : null;
// //       setEmployeeBillingRates((prev) =>
// //         prev.map((rate) =>
// //           rate.id === id
// //             ? {
// //                 ...rate,
// //                 [field]: value,
// //                 ...(field === "empId" && selectedEmp
// //                   ? { employeeName: selectedEmp.employeeName }
// //                   : {}),
// //               }
// //             : rate
// //         )
// //       );
// //     } else {
// //       const selectedEmp =
// //         field === "empId" ? employees.find((emp) => emp.empId === value) : null;
// //       setNewEmployeeRate((prev) => ({
// //         ...prev,
// //         [field]: value,
// //         ...(field === "empId" && selectedEmp
// //           ? { employeeName: selectedEmp.employeeName }
// //           : {}),
// //       }));
// //     }
// //   };

// //   // Vendor Billing Rates Handlers
// //   const handleAddVendorRow = () => {
// //     setNewVendorRate({
// //       lookupType: "Select",
// //       vendorId: "",
// //       vendorName: "",
// //       vendorEmployee: "",
// //       vendorEmployeeName: "",
// //       plc: "",
// //       billRate: "",
// //       rateType: "Select",
// //       startDate: "",
// //       endDate: "",
// //     });
// //   };

// //   const handleSaveNewVendorRate = async () => {
// //     if (
// //       !newVendorRate ||
// //       !newVendorRate.vendorId ||
// //       !newVendorRate.vendorName ||
// //       !newVendorRate.plc ||
// //       !newVendorRate.startDate ||
// //       !newVendorRate.billRate
// //     ) {
// //       console.error(
// //         "Please fill all required fields (Vendor ID, Vendor Name, PLC, Bill Rate, Start Date)"
// //       );
// //       return;
// //     }
// //     setLoading(true);
// //     try {
// //       await axios.post(`https://test-api-3tmq.onrender.com/ProjVendRt`, {
// //         projVendRtKey: 0,
// //         projId: selectedPlan?.projId,
// //         vendId: newVendorRate.vendorId,
// //         vendEmplId: newVendorRate.vendorEmployee,
// //         billLabCatCd: newVendorRate.plc,
// //         billDiscRt: 0,
// //         companyId: "1",
// //         billRtAmt: parseFloat(newVendorRate.billRate),
// //         startDt: new Date(newVendorRate.startDate).toISOString(),
// //         endDt: newVendorRate.endDate
// //           ? new Date(newVendorRate.endDate).toISOString()
// //           : null,
// //         sBillRtTypeCd: newVendorRate.rateType,
// //         modifiedBy: "admin",
// //         timeStamp: new Date().toISOString(),
// //       });
// //       setNewVendorRate(null);
// //       const fetchResponse = await axios.get(
// //         `https://test-api-3tmq.onrender.com/ProjVendRt`
// //       );
// //       const filteredData = fetchResponse.data.filter((item) =>
// //         item.projId.toLowerCase().startsWith(selectedProjectId.toLowerCase())
// //       );
// //       setVendorBillingRates(
// //         filteredData.map((item) => ({
// //           id: item.id,
// //           lookupType: item.lookupType || "Select",
// //           vendorId: item.vendId || "",
// //           vendorName: item.vendorName || "",
// //           vendorEmployee: item.vendEmplId || "",
// //           vendorEmployeeName: item.vendEmplName || "",
// //           plc: item.billLabCatCd,
// //           plcDescription: item.description || "",
// //           billRate: item.billRtAmt,
// //           rateType: item.sBillRtTypeCd || "Select",
// //           startDate: new Date(item.startDt).toISOString().split("T")[0],
// //           endDate: item.endDt
// //             ? new Date(item.endDt).toISOString().split("T")[0]
// //             : null,
// //         }))
// //       );
// //     } catch (error) {
// //       console.error(
// //         "Error adding vendor billing rate:",
// //         error.response ? error.response.data : error.message
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleVendorBillRateChange = (id, value) => {
// //     setEditVendorBillRate((prev) => ({
// //       ...prev,
// //       [id]: value === "" ? "" : parseFloat(value) || 0,
// //     }));
// //   };

// //   const handleUpdateVendor = async (id, updatedData) => {
// //     setLoading(true);
// //     try {
// //       await axios.put(`https://test-api-3tmq.onrender.com/ProjVendRt/${id}`, {
// //         id,
// //         projId: selectedProjectId,
// //         vendId: updatedData.vendorId,
// //         vendEmplId: updatedData.vendorEmployee,
// //         billLabCatCd: updatedData.plc,
// //         billDiscRt: 0,
// //         companyId: "1",
// //         billRtAmt: parseFloat(updatedData.billRate),
// //         startDt: new Date(updatedData.startDate).toISOString(),
// //         endDt: updatedData.endDate
// //           ? new Date(updatedData.endDate).toISOString()
// //           : null,
// //         sBillRtTypeCd: updatedData.rateType,
// //         modifiedBy: "admin",
// //         timeStamp: new Date().toISOString(),
// //       });
// //       const fetchResponse = await axios.get(
// //         `https://test-api-3tmq.onrender.com/ProjVendRt`
// //       );
// //       const filteredData = fetchResponse.data.filter((item) =>
// //         item.projId.toLowerCase().startsWith(selectedProjectId.toLowerCase())
// //       );
// //       setVendorBillingRates(
// //         filteredData.map((item) => ({
// //           id: item.id,
// //           lookupType: item.lookupType || "Select",
// //           vendorId: item.vendId || "",
// //           vendorName: item.vendorName || "",
// //           vendorEmployee: item.vendEmplId || "",
// //           vendorEmployeeName: item.vendEmplName || "",
// //           plc: item.billLabCatCd,
// //           plcDescription: item.description || "",
// //           billRate: item.billRtAmt,
// //           rateType: item.sBillRtTypeCd || "Select",
// //           startDate: new Date(item.startDt).toISOString().split("T")[0],
// //           endDate: item.endDt
// //             ? new Date(item.endDt).toISOString().split("T")[0]
// //             : null,
// //         }))
// //       );
// //       setEditVendorBillRate((prev) => ({
// //         ...prev,
// //         [id]: updatedData.billRate,
// //       }));
// //     } catch (error) {
// //       console.error("Error updating vendor billing rate:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleDeleteVendor = async (id) => {
// //     setLoading(true);
// //     try {
// //       await axios.delete(`https://test-api-3tmq.onrender.com/ProjVendRt/${id}`);
// //       const response = await axios.get(
// //         `https://test-api-3tmq.onrender.com/ProjVendRt`
// //       );
// //       const filteredData = response.data.filter((item) =>
// //         item.projId.toLowerCase().startsWith(selectedProjectId.toLowerCase())
// //       );
// //       setVendorBillingRates(
// //         filteredData.map((item) => ({
// //           id: item.id,
// //           lookupType: item.lookupType || "Select",
// //           vendorId: item.vendId || "",
// //           vendorName: item.vendorName || "",
// //           vendorEmployee: item.vendEmplId || "",
// //           vendorEmployeeName: item.vendEmplName || "",
// //           plc: item.billLabCatCd,
// //           plcDescription: item.description || "",
// //           billRate: item.billRtAmt,
// //           rateType: item.sBillRtTypeCd || "Select",
// //           startDate: new Date(item.startDt).toISOString().split("T")[0],
// //           endDate: item.endDt
// //             ? new Date(item.endDt).toISOString().split("T")[0]
// //             : null,
// //         }))
// //       );
// //       setEditVendorBillRate((prev) => {
// //         const newEditVendorBillRate = { ...prev };
// //         delete newEditVendorBillRate[id];
// //         return newEditVendorBillRate;
// //       });
// //     } catch (error) {
// //       console.error("Error deleting vendor billing rate:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleNewVendorRateChange = (field, value) => {
// //     setNewVendorRate((prev) => ({ ...prev, [field]: value }));
// //   };

// //   return (
// //     <div className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16 text-xs">
// //       <div className="mb-4">
// //         <h3 className="text-xs font-normal">
// //           Project Labor Categories Billing Rates Schedule
// //         </h3>
// //         <div className="overflow-x-auto">
// //           <table className="w-full text-xs border-collapse">
// //             <thead>
// //               <tr className="bg-gray-100">
// //                 <th className="border p-1 font-normal">Plc</th>
// //                 <th className="border p-1 font-normal">Bill Rate</th>
// //                 <th className="border p-1 font-normal">Rate Type</th>
// //                 <th className="border p-1 font-normal">Start Date</th>
// //                 <th className="border p-1 font-normal">End Date</th>
// //                 <th className="border p-1 font-normal">Actions</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {loading ? (
// //                 <tr>
// //                   <td colSpan="6" className="border p-1 text-center">
// //                     Loading...
// //                   </td>
// //                 </tr>
// //               ) : billingRatesSchedule.length === 0 ? (
// //                 <tr>
// //                   <td colSpan="6" className="border p-1 text-center">
// //                     No data available
// //                   </td>
// //                 </tr>
// //               ) : (
// //                 billingRatesSchedule.map((item) => (
// //                   <tr
// //                     key={item.id}
// //                     className="sm:table-row flex flex-col sm:flex-row mb-1 sm:mb-0"
// //                   >
// //                     <td className="border p-1 sm:w-1/6">
// //                       <input
// //                         type="text"
// //                         value={item.plc}
// //                         onChange={(e) => {
// //                           handleNewRateChange("plc", e.target.value);
// //                           setPlcSearch(e.target.value);
// //                         }}
// //                         className="w-full p-1 border rounded text-xs"
// //                         list="plc-list"
// //                       />
// //                       <datalist id="plc-list">
// //                         {plcs.map((plc) => (
// //                           <option
// //                             key={plc.laborCategoryCode}
// //                             value={plc.laborCategoryCode}
// //                           >
// //                             {plc.description}
// //                           </option>
// //                         ))}
// //                       </datalist>
// //                     </td>
// //                     <td className="border p-1 sm:w-1/6">
// //                       <input
// //                         type="text"
// //                         value={editBillRate[item.id] ?? item.billRate}
// //                         onChange={(e) =>
// //                           handleBillRateChange(item.id, e.target.value)
// //                         }
// //                         className="w-full p-1 border rounded text-xs"
// //                       />
// //                     </td>
// //                     <td className="border p-1 sm:w-1/6">
// //                       <select
// //                         value={item.rateType}
// //                         onChange={(e) =>
// //                           handleNewRateChange("rateType", e.target.value)
// //                         }
// //                         className="w-full p-1 border rounded text-xs"
// //                       >
// //                         {rateTypeOptions.map((option) => (
// //                           <option key={option} value={option}>
// //                             {option}
// //                           </option>
// //                         ))}
// //                       </select>
// //                     </td>
// //                     <td className="border p-1 sm:w-1/6">
// //                       <input
// //                         type="date"
// //                         value={item.startDate}
// //                         onChange={(e) =>
// //                           handleNewRateChange("startDate", e.target.value)
// //                         }
// //                         className="w-full p-1 border rounded text-xs"
// //                       />
// //                     </td>
// //                     <td className="border p-1 sm:w-1/6">
// //                       <input
// //                         type="date"
// //                         value={item.endDate || ""}
// //                         onChange={(e) =>
// //                           handleNewRateChange("endDate", e.target.value)
// //                         }
// //                         className="w-full p-1 border rounded text-xs"
// //                       />
// //                     </td>
// //                     <td className="border p-1 sm:w-1/6">
// //                       <div className="flex flex-col sm:flex-row justify-center space-y-1 sm:space-y-0 sm:space-x-1">
// //                         <button
// //                           onClick={() =>
// //                             handleUpdate(item.id, {
// //                               ...item,
// //                               billRate: editBillRate[item.id] || item.billRate,
// //                             })
// //                           }
// //                           className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-yellow-600 transition w-full sm:w-auto"
// //                           disabled={loading}
// //                         >
// //                           Update
// //                         </button>
// //                         <button
// //                           onClick={() => handleDelete(item.id)}
// //                           className="bg-red-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-red-600 transition w-full sm:w-auto"
// //                           disabled={loading}
// //                         >
// //                           Delete
// //                         </button>
// //                       </div>
// //                     </td>
// //                   </tr>
// //                 ))
// //               )}
// //               {newRate && (
// //                 <tr className="sm:table-row flex flex-col sm:flex-row mb-1 sm:mb-0">
// //                   <td className="border p-1 sm:w-1/6">
// //                     <input
// //                       type="text"
// //                       value={newRate.plc || ""}
// //                       onChange={(e) => {
// //                         handleNewRateChange("plc", e.target.value);
// //                         setPlcSearch(e.target.value);
// //                       }}
// //                       className="w-full p-1 border rounded text-xs"
// //                       list="plc-list"
// //                     />
// //                     <datalist id="plc-list">
// //                       {plcs.map((plc) => (
// //                         <option
// //                           key={plc.laborCategoryCode}
// //                           value={plc.laborCategoryCode}
// //                         >
// //                           {plc.description}
// //                         </option>
// //                       ))}
// //                     </datalist>
// //                   </td>
// //                   <td className="border p-1 sm:w-1/6">
// //                     <input
// //                       type="text"
// //                       value={newRate.billRate || ""}
// //                       onChange={(e) =>
// //                         handleNewRateChange("billRate", e.target.value)
// //                       }
// //                       className="w-full p-1 border rounded text-xs"
// //                     />
// //                   </td>
// //                   <td className="border p-1 sm:w-1/6">
// //                     <select
// //                       value={newRate.rateType}
// //                       onChange={(e) =>
// //                         handleNewRateChange("rateType", e.target.value)
// //                       }
// //                       className="w-full p-1 border rounded text-xs"
// //                     >
// //                       {rateTypeOptions.map((option) => (
// //                         <option key={option} value={option}>
// //                           {option}
// //                         </option>
// //                       ))}
// //                     </select>
// //                   </td>
// //                   <td className="border p-1 sm:w-1/6">
// //                     <input
// //                       type="date"
// //                       value={newRate.startDate || ""}
// //                       onChange={(e) =>
// //                         handleNewRateChange("startDate", e.target.value)
// //                       }
// //                       className="w-full p-1 border rounded text-xs"
// //                     />
// //                   </td>
// //                   <td className="border p-1 sm:w-1/6">
// //                     <input
// //                       type="date"
// //                       value={newRate.endDate || ""}
// //                       onChange={(e) =>
// //                         handleNewRateChange("endDate", e.target.value)
// //                       }
// //                       className="w-full p-1 border rounded text-xs"
// //                     />
// //                   </td>
// //                   <td className="border p-1 sm:w-1/6">
// //                     <div className="flex flex-col sm:flex-row justify-center space-y-1 sm:space-y-0 sm:space-x-1">
// //                       <button
// //                         onClick={handleSaveNewRate}
// //                         className="bg-green-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-green-600 transition w-full sm:w-auto"
// //                         disabled={loading}
// //                       >
// //                         Save
// //                       </button>
// //                       <button
// //                         onClick={() => setNewRate(null)}
// //                         className="bg-gray-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-gray-600 transition w-full sm:w-auto"
// //                         disabled={loading}
// //                       >
// //                         Cancel
// //                       </button>
// //                     </div>
// //                   </td>
// //                 </tr>
// //               )}
// //               <tr>
// //                 <td colSpan="6" className="border p-1">
// //                   <button
// //                     onClick={handleAddRow}
// //                     className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-blue-600 transition"
// //                     disabled={loading || newRate}
// //                   >
// //                     Add
// //                   </button>
// //                 </td>
// //               </tr>
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>

// //       <div className="mb-4">
// //         <h3 className="text-xs font-normal">Employee Billing Rates Schedule</h3>
// //         <div className="overflow-x-auto">
// //           <table className="w-full text-xs border-collapse">
// //             <thead>
// //               <tr className="bg-gray-100">
// //                 <th className="border p-1 font-normal">Lookup Type</th>
// //                 <th className="border p-1 font-normal">Employee</th>
// //                 <th className="border p-1 font-normal">Employee Name</th>
// //                 <th className="border p-1 font-normal">PLC</th>
// //                 <th className="border p-1 font-normal">PLC Description</th>
// //                 <th className="border p-1 font-normal">Bill Rate</th>
// //                 <th className="border p-1 font-normal">Rate Type</th>
// //                 <th className="border p-1 font-normal">Start Date</th>
// //                 <th className="border p-1 font-normal">End Date</th>
// //                 <th className="border p-1 font-normal">Actions</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {loading ? (
// //                 <tr>
// //                   <td colSpan="10" className="border p-1 text-center">
// //                     Loading...
// //                   </td>
// //                 </tr>
// //               ) : employeeBillingRates.length === 0 && !newEmployeeRate ? (
// //                 <tr>
// //                   <td colSpan="10" className="border p-1 text-center">
// //                     No data available
// //                   </td>
// //                 </tr>
// //               ) : (
// //                 employeeBillingRates.map((item) => (
// //                   <tr
// //                     key={item.id}
// //                     className="sm:table-row flex flex-col sm:flex-row mb-1 sm:mb-0"
// //                   >
// //                     <td className="border p-1 sm:w-1/10">
// //                       <select
// //                         value={item.lookupType}
// //                         onChange={(e) =>
// //                           handleNewEmployeeRateChange(
// //                             "lookupType",
// //                             e.target.value,
// //                             item.id
// //                           )
// //                         }
// //                         className="w-full p-1 border rounded text-xs"
// //                       >
// //                         {lookupTypeOptions.map((option) => (
// //                           <option key={option} value={option}>
// //                             {option}
// //                           </option>
// //                         ))}
// //                       </select>
// //                     </td>
// //                     <td className="border p-1 sm:w-1/10">
// //                       <input
// //                         type="text"
// //                         value={item.empId}
// //                         onChange={(e) =>
// //                           handleNewEmployeeRateChange(
// //                             "empId",
// //                             e.target.value,
// //                             item.id
// //                           )
// //                         }
// //                         className="w-full p-1 border rounded text-xs"
// //                         list="employee-list"
// //                         disabled={employees.length === 0}
// //                       />
// //                       <datalist id="employee-list">
// //                         {employees.map((emp) => (
// //                           <option key={emp.empId} value={emp.empId}>
// //                             {emp.employeeName}
// //                           </option>
// //                         ))}
// //                       </datalist>
// //                     </td>
// //                     <td className="border p-1 sm:w-1/10">
// //                       {item.employeeName}
// //                     </td>
// //                     <td className="border p-1 sm:w-1/10">
// //                       <input
// //                         type="text"
// //                         value={item.plc}
// //                         onChange={(e) => {
// //                           handleNewEmployeeRateChange(
// //                             "plc",
// //                             e.target.value,
// //                             item.id
// //                           );
// //                           setPlcSearch(e.target.value);
// //                         }}
// //                         className="w-full p-1 border rounded text-xs"
// //                         list="plc-list"
// //                       />
// //                       <datalist id="plc-list">
// //                         {plcs.map((plc) => (
// //                           <option
// //                             key={plc.laborCategoryCode}
// //                             value={plc.laborCategoryCode}
// //                           >
// //                             {plc.description}
// //                           </option>
// //                         ))}
// //                       </datalist>
// //                     </td>
// //                     <td className="border p-1 sm:w-1/10">
// //                       {plcs.find((plc) => plc.laborCategoryCode === item.plc)
// //                         ?.description || item.plcDescription}
// //                     </td>
// //                     <td className="border p-1 sm:w-1/10">
// //                       <input
// //                         type="text"
// //                         value={editEmployeeBillRate[item.id] ?? item.billRate}
// //                         onChange={(e) =>
// //                           handleEmployeeBillRateChange(item.id, e.target.value)
// //                         }
// //                         className="w-full p-1 border rounded text-xs"
// //                       />
// //                     </td>
// //                     <td className="border p-1 sm:w-1/10">
// //                       <select
// //                         value={item.rateType}
// //                         onChange={(e) =>
// //                           handleNewEmployeeRateChange(
// //                             "rateType",
// //                             e.target.value,
// //                             item.id
// //                           )
// //                         }
// //                         className="w-full p-1 border rounded text-xs"
// //                       >
// //                         {rateTypeOptions.map((option) => (
// //                           <option key={option} value={option}>
// //                             {option}
// //                           </option>
// //                         ))}
// //                       </select>
// //                     </td>
// //                     <td className="border p-1 sm:w-1/10">
// //                       <input
// //                         type="date"
// //                         value={item.startDate}
// //                         onChange={(e) =>
// //                           handleNewEmployeeRateChange(
// //                             "startDate",
// //                             e.target.value,
// //                             item.id
// //                           )
// //                         }
// //                         className="w-full p-1 border rounded text-xs"
// //                       />
// //                     </td>
// //                     <td className="border p-1 sm:w-1/10">
// //                       <input
// //                         type="date"
// //                         value={item.endDate || ""}
// //                         onChange={(e) =>
// //                           handleNewEmployeeRateChange(
// //                             "endDate",
// //                             e.target.value,
// //                             item.id
// //                           )
// //                         }
// //                         className="w-full p-1 border rounded text-xs"
// //                       />
// //                     </td>
// //                     <td className="border p-1 sm:w-1/10">
// //                       <div className="flex flex-col sm:flex-row justify-center space-y-1 sm:space-y-0 sm:space-x-1">
// //                         <button
// //                           onClick={() =>
// //                             handleUpdateEmployee(item.id, {
// //                               ...item,
// //                               billRate:
// //                                 editEmployeeBillRate[item.id] || item.billRate,
// //                             })
// //                           }
// //                           className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-yellow-600 transition w-full sm:w-auto"
// //                           disabled={loading}
// //                         >
// //                           Update
// //                         </button>
// //                         <button
// //                           onClick={() => handleDeleteEmployee(item.id)}
// //                           className="bg-red-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-red-600 transition w-full sm:w-auto"
// //                           disabled={loading}
// //                         >
// //                           Delete
// //                         </button>
// //                       </div>
// //                     </td>
// //                   </tr>
// //                 ))
// //               )}
// //               {newEmployeeRate && (
// //                 <tr className="sm:table-row flex flex-col sm:flex-row mb-1 sm:mb-0">
// //                   <td className="border p-1 sm:w-1/10">
// //                     <select
// //                       value={newEmployeeRate.lookupType}
// //                       onChange={(e) =>
// //                         handleNewEmployeeRateChange(
// //                           "lookupType",
// //                           e.target.value
// //                         )
// //                       }
// //                       className="w-full p-1 border rounded text-xs"
// //                     >
// //                       {lookupTypeOptions.map((option) => (
// //                         <option key={option} value={option}>
// //                           {option}
// //                         </option>
// //                       ))}
// //                     </select>
// //                   </td>
// //                   <td className="border p-1 sm:w-1/10">
// //                     <input
// //                       type="text"
// //                       value={newEmployeeRate.empId || ""}
// //                       onChange={(e) =>
// //                         handleNewEmployeeRateChange("empId", e.target.value)
// //                       }
// //                       className="w-full p-1 border rounded text-xs"
// //                       list="employee-list"
// //                       disabled={employees.length === 0}
// //                     />
// //                     <datalist id="employee-list">
// //                       {employees.map((emp) => (
// //                         <option key={emp.empId} value={emp.empId}>
// //                           {emp.employeeName}
// //                         </option>
// //                       ))}
// //                     </datalist>
// //                   </td>
// //                   <td className="border p-1 sm:w-1/10">
// //                     {newEmployeeRate.employeeName || ""}
// //                   </td>
// //                   <td className="border p-1 sm:w-1/10">
// //                     <input
// //                       type="text"
// //                       value={newEmployeeRate.plc || ""}
// //                       onChange={(e) => {
// //                         handleNewEmployeeRateChange("plc", e.target.value);
// //                         setPlcSearch(e.target.value);
// //                       }}
// //                       className="w-full p-1 border rounded text-xs"
// //                       list="plc-list"
// //                     />
// //                     <datalist id="plc-list">
// //                       {plcs.map((plc) => (
// //                         <option
// //                           key={plc.laborCategoryCode}
// //                           value={plc.laborCategoryCode}
// //                         >
// //                           {plc.description}
// //                         </option>
// //                       ))}
// //                     </datalist>
// //                   </td>
// //                   <td className="border p-1 sm:w-1/10">
// //                     {plcs.find(
// //                       (plc) => plc.laborCategoryCode === newEmployeeRate.plc
// //                     )?.description || ""}
// //                   </td>
// //                   <td className="border p-1 sm:w-1/10">
// //                     <input
// //                       type="text"
// //                       value={newEmployeeRate.billRate || ""}
// //                       onChange={(e) =>
// //                         handleNewEmployeeRateChange("billRate", e.target.value)
// //                       }
// //                       className="w-full p-1 border rounded text-xs"
// //                     />
// //                   </td>
// //                   <td className="border p-1 sm:w-1/10">
// //                     <select
// //                       value={newEmployeeRate.rateType}
// //                       onChange={(e) =>
// //                         handleNewEmployeeRateChange("rateType", e.target.value)
// //                       }
// //                       className="w-full p-1 border rounded text-xs"
// //                     >
// //                       {rateTypeOptions.map((option) => (
// //                         <option key={option} value={option}>
// //                           {option}
// //                         </option>
// //                       ))}
// //                     </select>
// //                   </td>
// //                   <td className="border p-1 sm:w-1/10">
// //                     <input
// //                       type="date"
// //                       value={newEmployeeRate.startDate || ""}
// //                       onChange={(e) =>
// //                         handleNewEmployeeRateChange("startDate", e.target.value)
// //                       }
// //                       className="w-full p-1 border rounded text-xs"
// //                     />
// //                   </td>
// //                   <td className="border p-1 sm:w-1/10">
// //                     <input
// //                       type="date"
// //                       value={newEmployeeRate.endDate || ""}
// //                       onChange={(e) =>
// //                         handleNewEmployeeRateChange("endDate", e.target.value)
// //                       }
// //                       className="w-full p-1 border rounded text-xs"
// //                     />
// //                   </td>
// //                   <td className="border p-1 sm:w-1/10">
// //                     <div className="flex flex-col sm:flex-row justify-center space-y-1 sm:space-y-0 sm:space-x-1">
// //                       <button
// //                         onClick={handleSaveNewEmployeeRate}
// //                         className="bg-green-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-green-600 transition w-full sm:w-auto"
// //                         disabled={loading}
// //                       >
// //                         Save
// //                       </button>
// //                       <button
// //                         onClick={() => setNewEmployeeRate(null)}
// //                         className="bg-gray-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-gray-600 transition w-full sm:w-auto"
// //                         disabled={loading}
// //                       >
// //                         Cancel
// //                       </button>
// //                     </div>
// //                   </td>
// //                 </tr>
// //               )}
// //               <tr>
// //                 <td colSpan="10" className="border p-1">
// //                   <button
// //                     onClick={handleAddEmployeeRow}
// //                     className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-blue-600 transition"
// //                     disabled={loading || newEmployeeRate}
// //                   >
// //                     Add
// //                   </button>
// //                 </td>
// //               </tr>
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>

// //       <div className="mb-4">
// //         <h3 className="text-xs font-normal">Vendor Billing Rates Schedule</h3>
// //         <div className="overflow-x-auto">
// //           <table className="w-full text-xs border-collapse">
// //             <thead>
// //               <tr className="bg-gray-100">
// //                 <th className="border p-1 font-normal">Lookup Type</th>
// //                 <th className="border p-1 font-normal">Vendor</th>
// //                 <th className="border p-1 font-normal">Vendor Name</th>
// //                 <th className="border p-1 font-normal">Vendor Employee</th>
// //                 <th className="border p-1 font-normal">Vendor Employee Name</th>
// //                 <th className="border p-1 font-normal">PLC</th>
// //                 <th className="border p-1 font-normal">PLC Description</th>
// //                 <th className="border p-1 font-normal">Bill Rate</th>
// //                 <th className="border p-1 font-normal">Rate Type</th>
// //                 <th className="border p-1 font-normal">Start Date</th>
// //                 <th className="border p-1 font-normal">End Date</th>
// //                 <th className="border p-1 font-normal">Actions</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {loading ? (
// //                 <tr>
// //                   <td colSpan="12" className="border p-1 text-center">
// //                     Loading...
// //                   </td>
// //                 </tr>
// //               ) : vendorBillingRates.length === 0 ? (
// //                 <tr>
// //                   <td colSpan="12" className="border p-1 text-center">
// //                     No data available
// //                   </td>
// //                 </tr>
// //               ) : (
// //                 vendorBillingRates.map((item) => (
// //                   <tr
// //                     key={item.id}
// //                     className="sm:table-row flex flex-col sm:flex-row mb-1 sm:mb-0"
// //                   >
// //                     <td className="border p-1 sm:w-1/12">
// //                       <select
// //                         value={item.lookupType}
// //                         onChange={(e) =>
// //                           setVendorBillingRates((prev) =>
// //                             prev.map((rate) =>
// //                               rate.id === item.id
// //                                 ? { ...rate, lookupType: e.target.value }
// //                                 : rate
// //                             )
// //                           )
// //                         }
// //                         className="w-full p-1 border rounded text-xs"
// //                       >
// //                         {lookupTypeOptions.map((option) => (
// //                           <option key={option} value={option}>
// //                             {option}
// //                           </option>
// //                         ))}
// //                       </select>
// //                     </td>
// //                     <td className="border p-1 sm:w-1/12">
// //                       <input
// //                         type="text"
// //                         value={item.vendorId}
// //                         onChange={(e) =>
// //                           setVendorBillingRates((prev) =>
// //                             prev.map((rate) =>
// //                               rate.id === item.id
// //                                 ? { ...rate, vendorId: e.target.value }
// //                                 : rate
// //                             )
// //                           )
// //                         }
// //                         className="w-full p-1 border rounded text-xs"
// //                       />
// //                     </td>
// //                     <td className="border p-1 sm:w-1/12">
// //                       <input
// //                         type="text"
// //                         value={item.vendorName}
// //                         onChange={(e) =>
// //                           setVendorBillingRates((prev) =>
// //                             prev.map((rate) =>
// //                               rate.id === item.id
// //                                 ? { ...rate, vendorName: e.target.value }
// //                                 : rate
// //                             )
// //                           )
// //                         }
// //                         className="w-full p-1 border rounded text-xs"
// //                       />
// //                     </td>
// //                     <td className="border p-1 sm:w-1/12">
// //                       <input
// //                         type="text"
// //                         value={item.vendorEmployee}
// //                         onChange={(e) =>
// //                           setVendorBillingRates((prev) =>
// //                             prev.map((rate) =>
// //                               rate.id === item.id
// //                                 ? { ...rate, vendorEmployee: e.target.value }
// //                                 : rate
// //                             )
// //                           )
// //                         }
// //                         className="w-full p-1 border rounded text-xs"
// //                       />
// //                     </td>
// //                     <td className="border p-1 sm:w-1/12">
// //                       <input
// //                         type="text"
// //                         value={item.vendorEmployeeName}
// //                         onChange={(e) =>
// //                           setVendorBillingRates((prev) =>
// //                             prev.map((rate) =>
// //                               rate.id === item.id
// //                                 ? {
// //                                     ...rate,
// //                                     vendorEmployeeName: e.target.value,
// //                                   }
// //                                 : rate
// //                             )
// //                           )
// //                         }
// //                         className="w-full p-1 border rounded text-xs"
// //                       />
// //                     </td>
// //                     <td className="border p-1 sm:w-1/12">
// //                       <input
// //                         type="text"
// //                         value={item.plc}
// //                         onChange={(e) => {
// //                           setVendorBillingRates((prev) =>
// //                             prev.map((rate) =>
// //                               rate.id === item.id
// //                                 ? { ...rate, plc: e.target.value }
// //                                 : rate
// //                             )
// //                           );
// //                           setPlcSearch(e.target.value);
// //                         }}
// //                         className="w-full p-1 border rounded text-xs"
// //                         list="plc-list"
// //                       />
// //                       <datalist id="plc-list">
// //                         {plcs.map((plc) => (
// //                           <option
// //                             key={plc.laborCategoryCode}
// //                             value={plc.laborCategoryCode}
// //                           >
// //                             {plc.description}
// //                           </option>
// //                         ))}
// //                       </datalist>
// //                     </td>
// //                     <td className="border p-1 sm:w-1/12">
// //                       {plcs.find((plc) => plc.laborCategoryCode === item.plc)
// //                         ?.description || item.plcDescription}
// //                     </td>
// //                     <td className="border p-1 sm:w-1/12">
// //                       <input
// //                         type="text"
// //                         value={editVendorBillRate[item.id] ?? item.billRate}
// //                         onChange={(e) =>
// //                           handleVendorBillRateChange(item.id, e.target.value)
// //                         }
// //                         className="w-full p-1 border rounded text-xs"
// //                       />
// //                     </td>
// //                     <td className="border p-1 sm:w-1/12">
// //                       <select
// //                         value={item.rateType}
// //                         onChange={(e) =>
// //                           setVendorBillingRates((prev) =>
// //                             prev.map((rate) =>
// //                               rate.id === item.id
// //                                 ? { ...rate, rateType: e.target.value }
// //                                 : rate
// //                             )
// //                           )
// //                         }
// //                         className="w-full p-1 border rounded text-xs"
// //                       >
// //                         {rateTypeOptions.map((option) => (
// //                           <option key={option} value={option}>
// //                             {option}
// //                           </option>
// //                         ))}
// //                       </select>
// //                     </td>
// //                     <td className="border p-1 sm:w-1/12">
// //                       <input
// //                         type="date"
// //                         value={item.startDate}
// //                         onChange={(e) =>
// //                           setVendorBillingRates((prev) =>
// //                             prev.map((rate) =>
// //                               rate.id === item.id
// //                                 ? { ...rate, startDate: e.target.value }
// //                                 : rate
// //                             )
// //                           )
// //                         }
// //                         className="w-full p-1 border rounded text-xs"
// //                       />
// //                     </td>
// //                     <td className="border p-1 sm:w-1/12">
// //                       <input
// //                         type="date"
// //                         value={item.endDate || ""}
// //                         onChange={(e) =>
// //                           setVendorBillingRates((prev) =>
// //                             prev.map((rate) =>
// //                               rate.id === item.id
// //                                 ? { ...rate, endDate: e.target.value }
// //                                 : rate
// //                             )
// //                           )
// //                         }
// //                         className="w-full p-1 border rounded text-xs"
// //                       />
// //                     </td>
// //                     <td className="border p-1 sm:w-1/12">
// //                       <div className="flex flex-col sm:flex-row justify-center space-y-1 sm:space-y-0 sm:space-x-1">
// //                         <button
// //                           onClick={() =>
// //                             handleUpdateVendor(item.id, {
// //                               ...item,
// //                               billRate:
// //                                 editVendorBillRate[item.id] || item.billRate,
// //                             })
// //                           }
// //                           className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-yellow-600 transition w-full sm:w-auto"
// //                           disabled={loading}
// //                         >
// //                           Update
// //                         </button>
// //                         <button
// //                           onClick={() => handleDeleteVendor(item.id)}
// //                           className="bg-red-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-red-600 transition w-full sm:w-auto"
// //                           disabled={loading}
// //                         >
// //                           Delete
// //                         </button>
// //                       </div>
// //                     </td>
// //                   </tr>
// //                 ))
// //               )}
// //               {newVendorRate && (
// //                 <tr className="sm:table-row flex flex-col sm:flex-row mb-1 sm:mb-0">
// //                   <td className="border p-1 sm:w-1/12">
// //                     <select
// //                       value={newVendorRate.lookupType}
// //                       onChange={(e) =>
// //                         handleNewVendorRateChange("lookupType", e.target.value)
// //                       }
// //                       className="w-full p-1 border rounded text-xs"
// //                     >
// //                       {lookupTypeOptions.map((option) => (
// //                         <option key={option} value={option}>
// //                           {option}
// //                         </option>
// //                       ))}
// //                     </select>
// //                   </td>
// //                   <td className="border p-1 sm:w-1/12">
// //                     <input
// //                       type="text"
// //                       value={newVendorRate.vendorId || ""}
// //                       onChange={(e) =>
// //                         handleNewVendorRateChange("vendorId", e.target.value)
// //                       }
// //                       className="w-full p-1 border rounded text-xs"
// //                     />
// //                   </td>
// //                   <td className="border p-1 sm:w-1/12">
// //                     <input
// //                       type="text"
// //                       value={newVendorRate.vendorName || ""}
// //                       onChange={(e) =>
// //                         handleNewVendorRateChange("vendorName", e.target.value)
// //                       }
// //                       className="w-full p-1 border rounded text-xs"
// //                     />
// //                   </td>
// //                   <td className="border p-1 sm:w-1/12">
// //                     <input
// //                       type="text"
// //                       value={newVendorRate.vendorEmployee || ""}
// //                       onChange={(e) =>
// //                         handleNewVendorRateChange(
// //                           "vendorEmployee",
// //                           e.target.value
// //                         )
// //                       }
// //                       className="w-full p-1 border rounded text-xs"
// //                     />
// //                   </td>
// //                   <td className="border p-1 sm:w-1/12">
// //                     <input
// //                       type="text"
// //                       value={newVendorRate.vendorEmployeeName || ""}
// //                       onChange={(e) =>
// //                         handleNewVendorRateChange(
// //                           "vendorEmployeeName",
// //                           e.target.value
// //                         )
// //                       }
// //                       className="w-full p-1 border rounded text-xs"
// //                     />
// //                   </td>
// //                   <td className="border p-1 sm:w-1/12">
// //                     <input
// //                       type="text"
// //                       value={newVendorRate.plc || ""}
// //                       onChange={(e) => {
// //                         handleNewVendorRateChange("plc", e.target.value);
// //                         setPlcSearch(e.target.value);
// //                       }}
// //                       className="w-full p-1 border rounded text-xs"
// //                       list="plc-list"
// //                     />
// //                     <datalist id="plc-list">
// //                       {plcs.map((plc) => (
// //                         <option
// //                           key={plc.laborCategoryCode}
// //                           value={plc.laborCategoryCode}
// //                         >
// //                           {plc.description}
// //                         </option>
// //                       ))}
// //                     </datalist>
// //                   </td>
// //                   <td className="border p-1 sm:w-1/12">
// //                     {plcs.find(
// //                       (plc) => plc.laborCategoryCode === newVendorRate.plc
// //                     )?.description || ""}
// //                   </td>
// //                   <td className="border p-1 sm:w-1/12">
// //                     <input
// //                       type="text"
// //                       value={newVendorRate.billRate || ""}
// //                       onChange={(e) =>
// //                         handleNewVendorRateChange("billRate", e.target.value)
// //                       }
// //                       className="w-full p-1 border rounded text-xs"
// //                     />
// //                   </td>
// //                   <td className="border p-1 sm:w-1/12">
// //                     <select
// //                       value={newVendorRate.rateType}
// //                       onChange={(e) =>
// //                         handleNewVendorRateChange("rateType", e.target.value)
// //                       }
// //                       className="w-full p-1 border rounded text-xs"
// //                     >
// //                       {rateTypeOptions.map((option) => (
// //                         <option key={option} value={option}>
// //                           {option}
// //                         </option>
// //                       ))}
// //                     </select>
// //                   </td>
// //                   <td className="border p-1 sm:w-1/12">
// //                     <input
// //                       type="date"
// //                       value={newVendorRate.startDate || ""}
// //                       onChange={(e) =>
// //                         handleNewVendorRateChange("startDate", e.target.value)
// //                       }
// //                       className="w-full p-1 border rounded text-xs"
// //                     />
// //                   </td>
// //                   <td className="border p-1 sm:w-1/12">
// //                     <input
// //                       type="date"
// //                       value={newVendorRate.endDate || ""}
// //                       onChange={(e) =>
// //                         handleNewVendorRateChange("endDate", e.target.value)
// //                       }
// //                       className="w-full p-1 border rounded text-xs"
// //                     />
// //                   </td>
// //                   <td className="border p-1 sm:w-1/12">
// //                     <div className="flex flex-col sm:flex-row justify-center space-y-1 sm:space-y-0 sm:space-x-1">
// //                       <button
// //                         onClick={handleSaveNewVendorRate}
// //                         className="bg-green-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-green-600 transition w-full sm:w-auto"
// //                         disabled={loading}
// //                       >
// //                         Save
// //                       </button>
// //                       <button
// //                         onClick={() => setNewVendorRate(null)}
// //                         className="bg-gray-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-gray-600 transition w-full sm:w-auto"
// //                         disabled={loading}
// //                       >
// //                         Cancel
// //                       </button>
// //                     </div>
// //                   </td>
// //                 </tr>
// //               )}
// //               <tr>
// //                 <td colSpan="12" className="border p-1">
// //                   <button
// //                     onClick={handleAddVendorRow}
// //                     className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-blue-600 transition"
// //                     disabled={loading || newVendorRate}
// //                   >
// //                     Add
// //                   </button>
// //                 </td>
// //               </tr>
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default PLCComponent;


// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const PLCComponent = ({ selectedProjectId, selectedPlan }) => {
//   const [billingRatesSchedule, setBillingRatesSchedule] = useState([]);
//   const [newRate, setNewRate] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [editBillRate, setEditBillRate] = useState({});
//   const [employees, setEmployees] = useState([]);
//   const [employeeBillingRates, setEmployeeBillingRates] = useState([]);
//   const [newEmployeeRate, setNewEmployeeRate] = useState(null);
//   const [editEmployeeBillRate, setEditEmployeeBillRate] = useState({});
//   const [vendorBillingRates, setVendorBillingRates] = useState([]);
//   const [newVendorRate, setNewVendorRate] = useState(null);
//   const [editVendorBillRate, setEditVendorBillRate] = useState({});
//   const [plcs, setPlcs] = useState([]);
//   const [plcSearch, setPlcSearch] = useState("");

//   const lookupTypeOptions = ["Select", "Employee", "Contract Vendor"];
//   const rateTypeOptions = ["Select", "Billing", "Actual"];

//   // Fetch billing rates schedule based on selected project ID
//   useEffect(() => {
//     const fetchBillingRates = async () => {
//       if (!selectedProjectId) return;
//       setLoading(true);
//       try {
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/api/ProjectPlcRates`
//         );
//         const filteredData = response.data.filter((item) =>
//           item.projId.toLowerCase().startsWith(selectedProjectId.toLowerCase())
//         );
//         setBillingRatesSchedule(
//           filteredData.map((item) => ({
//             id: item.id,
//             plc: item.laborCategoryCode,
//             billRate: item.billingRate,
//             rateType: item.rateType || "Select",
//             startDate: item.effectiveDate
//               ? item.effectiveDate.split("T")[0]
//               : "",
//             endDate: item.endDate ? item.endDate.split("T")[0] : null,
//           }))
//         );
//         const newEditBillRate = {};
//         filteredData.forEach((item) => {
//           newEditBillRate[item.id] = item.billingRate;
//         });
//         setEditBillRate(newEditBillRate);
//       } catch (error) {
//         console.error("Error fetching billing rates:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBillingRates();
//   }, [selectedProjectId]);

//   // Fetch employees for the selected project
//   useEffect(() => {
//     const fetchEmployees = async () => {
//       if (
//         !selectedProjectId ||
//         typeof selectedProjectId !== "string" ||
//         selectedProjectId.trim() === ""
//       ) {
//         setEmployees([]);
//         return;
//       }
//       setLoading(true);
//       try {
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/Project/GetEmployeesByProject/${selectedProjectId}`
//         );
//         setEmployees(
//           response.data.map((item) => ({
//             empId: item.empId,
//             employeeName: item.employeeName,
//           }))
//         );
//       } catch (error) {
//         console.error("Error fetching employees:", error);
//         setEmployees([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchEmployees();
//   }, [selectedProjectId]);

//   // Fetch PLCs for search
//   useEffect(() => {
//     const fetchPlcs = async () => {
//       if (!plcSearch) return;
//       try {
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/Project/GetAllPlcs/${plcSearch}`
//         );
//         const filteredPlcs = response.data
//           .filter((item) =>
//             item.laborCategoryCode
//               .toLowerCase()
//               .includes(plcSearch.toLowerCase())
//           )
//           .map((item) => ({
//             laborCategoryCode: item.laborCategoryCode,
//             description: item.description || "",
//           }));
//         setPlcs(filteredPlcs);
//       } catch (error) {
//         console.error("Error fetching PLCs:", error);
//       }
//     };
//     fetchPlcs();
//   }, [plcSearch]);

//   // Fetch employee billing rates
//   useEffect(() => {
//     const fetchEmployeeBillingRates = async () => {
//       if (!selectedProjectId) return;
//       setLoading(true);
//       try {
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/ProjEmplRt`
//         );
//         const filteredData = response.data.filter(
//           (item) =>
//             item.projId
//               .toLowerCase()
//               .startsWith(selectedProjectId.toLowerCase()) && item.emplId
//         );
//         setEmployeeBillingRates(
//           filteredData.map((item) => ({
//             id: item.id,
//             lookupType: item.lookupType || "Select",
//             empId: item.emplId,
//             employeeName:
//               item.employeeName ||
//               employees.find((emp) => emp.empId === item.emplId)
//                 ?.employeeName ||
//               "",
//             plc: item.billLabCatCd,
//             plcDescription: item.plcDescription || "",
//             billRate: item.billRtAmt,
//             rateType: item.sBillRtTypeCd || "Select",
//             startDate: item.startDt ? item.startDt.split("T")[0] : "",
//             endDate: item.endDt ? item.endDt.split("T")[0] : null,
//           }))
//         );
//         const newEditEmployeeBillRate = {};
//         filteredData.forEach((item) => {
//           newEditEmployeeBillRate[item.id] = item.billRtAmt;
//         });
//         setEditEmployeeBillRate(newEditEmployeeBillRate);
//       } catch (error) {
//         console.error("Error fetching employee billing rates:", error);
//         setEmployeeBillingRates([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchEmployeeBillingRates();
//   }, [selectedProjectId, employees]);

//   // Fetch vendor billing rates
//   useEffect(() => {
//     const fetchVendorBillingRates = async () => {
//       if (!selectedProjectId) return;
//       setLoading(true);
//       try {
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/ProjVendRt`
//         );
//         const filteredData = response.data.filter((item) =>
//           item.projId.toLowerCase().startsWith(selectedProjectId.toLowerCase())
//         );
//         setVendorBillingRates(
//           filteredData.map((item) => ({
//             id: item.id,
//             lookupType: item.lookupType || "Select",
//             vendorId: item.vendId || "",
//             vendorName: item.vendorName || "",
//             vendorEmployee: item.vendEmplId || "",
//             vendorEmployeeName: item.vendEmplName || "",
//             plc: item.billLabCatCd,
//             plcDescription: item.description || "",
//             billRate: item.billRtAmt,
//             rateType: item.sBillRtTypeCd || "Select",
//             startDate: new Date(item.startDt).toISOString().split("T")[0],
//             endDate: item.endDt
//               ? new Date(item.endDt).toISOString().split("T")[0]
//               : null,
//           }))
//         );
//         const newEditVendorBillRate = {};
//         filteredData.forEach((item) => {
//           newEditVendorBillRate[item.id] = item.billRtAmt;
//         });
//         setEditVendorBillRate(newEditVendorBillRate);
//       } catch (error) {
//         console.error("Error fetching vendor billing rates:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchVendorBillingRates();
//   }, [selectedProjectId]);

//   const handleUpdate = async (id, updatedData) => {
//     setLoading(true);
//     try {
//       await axios.put(
//         `https://test-api-3tmq.onrender.com/api/ProjectPlcRates/${id}`,
//         {
//           id,
//           projId: selectedProjectId,
//           laborCategoryCode: updatedData.plc,
//           costRate: parseFloat(updatedData.billRate) * 0.65,
//           billingRate: parseFloat(updatedData.billRate),
//           effectiveDate: updatedData.startDate,
//           endDate: updatedData.endDate || null,
//           rateType: updatedData.rateType,
//           isActive: true,
//           modifiedBy: "admin",
//           createdAt: new Date().toISOString(),
//           updatedAt: new Date().toISOString(),
//         }
//       );
//       setBillingRatesSchedule((prev) =>
//         prev.map((rate) =>
//           rate.id === id
//             ? {
//                 ...rate,
//                 plc: updatedData.plc,
//                 billRate: parseFloat(updatedData.billRate),
//                 rateType: updatedData.rateType,
//                 startDate: updatedData.startDate,
//                 endDate: updatedData.endDate || null,
//               }
//             : rate
//         )
//       );
//       setEditBillRate((prev) => ({ ...prev, [id]: updatedData.billRate }));
//     } catch (error) {
//       console.error("Error updating billing rate:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     setLoading(true);
//     try {
//       await axios.delete(
//         `https://test-api-3tmq.onrender.com/api/ProjectPlcRates/${id}`
//       );
//       setBillingRatesSchedule((prev) => prev.filter((rate) => rate.id !== id));
//       setEditBillRate((prev) => {
//         const newEditBillRate = { ...prev };
//         delete newEditBillRate[id];
//         return newEditBillRate;
//       });
//     } catch (error) {
//       console.error("Error deleting billing rate:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddRow = () => {
//     setNewRate({
//       plc: "",
//       billRate: "",
//       rateType: "Select",
//       startDate: "",
//       endDate: "",
//     });
//   };

//   const handleSaveNewRate = async () => {
//     if (!newRate || !newRate.plc || !newRate.startDate || !newRate.billRate) {
//       console.error(
//         "Please fill all required fields (PLC, Bill Rate, Start Date)"
//       );
//       return;
//     }
//     setLoading(true);
//     try {
//       await axios.post(
//         `https://test-api-3tmq.onrender.com/api/ProjectPlcRates`,
//         {
//           id: 0,
//           projId: selectedProjectId,
//           laborCategoryCode: newRate.plc,
//           costRate: parseFloat(newRate.billRate) * 0.65,
//           billingRate: parseFloat(newRate.billRate),
//           effectiveDate: newRate.startDate,
//           endDate: newRate.endDate || null,
//           rateType: newRate.rateType,
//           isActive: true,
//           modifiedBy: "admin",
//           createdAt: new Date().toISOString(),
//           updatedAt: new Date().toISOString(),
//         }
//       );
//       setNewRate(null);
//       const fetchResponse = await axios.get(
//         `https://test-api-3tmq.onrender.com/api/ProjectPlcRates`
//       );
//       const filteredData = fetchResponse.data.filter((item) =>
//         item.projId.toLowerCase().startsWith(selectedProjectId.toLowerCase())
//       );
//       setBillingRatesSchedule(
//         filteredData.map((item) => ({
//           id: item.id,
//           plc: item.laborCategoryCode,
//           billRate: item.billingRate,
//           rateType: item.rateType || "Select",
//           startDate: item.effectiveDate ? item.effectiveDate.split("T")[0] : "",
//           endDate: item.endDate ? item.endDate.split("T")[0] : null,
//         }))
//       );
//     } catch (error) {
//       console.error(
//         "Error adding billing rate:",
//         error.response ? error.response.data : error.message
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleNewRateChange = (field, value) => {
//     setNewRate((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleBillRateChange = (id, value) => {
//     setEditBillRate((prev) => ({
//       ...prev,
//       [id]: value === "" ? "" : parseFloat(value) || 0,
//     }));
//   };

//   // Employee Billing Rates Handlers
//   const handleAddEmployeeRow = () => {
//     setNewEmployeeRate({
//       lookupType: "Select",
//       empId: "",
//       employeeName: "",
//       plc: "",
//       billRate: "",
//       rateType: "Select",
//       startDate: "",
//       endDate: "",
//     });
//   };

//   const handleSaveNewEmployeeRate = async () => {
//     if (
//       !newEmployeeRate ||
//       !newEmployeeRate.empId ||
//       !newEmployeeRate.plc ||
//       !newEmployeeRate.startDate ||
//       !newEmployeeRate.billRate
//     ) {
//       console.error(
//         "Please fill all required fields (Employee, PLC, Bill Rate, Start Date)"
//       );
//       return;
//     }
//     setLoading(true);
//     try {
//       await axios.post(`https://test-api-3tmq.onrender.com/ProjEmplRt`, {
//         id: 0,
//         projId: selectedProjectId,
//         emplId: newEmployeeRate.empId,
//         employeeName: newEmployeeRate.employeeName,
//         billLabCatCd: newEmployeeRate.plc,
//         billRtAmt: parseFloat(newEmployeeRate.billRate),
//         startDt: newEmployeeRate.startDate,
//         endDt: newEmployeeRate.endDate || null,
//         sBillRtTypeCd: newEmployeeRate.rateType,
//         lookupType: newEmployeeRate.lookupType,
//         isActive: true,
//         modifiedBy: "admin",
//       });
//       setNewEmployeeRate(null);
//       const fetchResponse = await axios.get(
//         `https://test-api-3tmq.onrender.com/ProjEmplRt`
//       );
//       const filteredData = fetchResponse.data.filter(
//         (item) =>
//           item.projId
//             .toLowerCase()
//             .startsWith(selectedProjectId.toLowerCase()) && item.emplId
//       );
//       setEmployeeBillingRates(
//         filteredData.map((item) => ({
//           id: item.id,
//           lookupType: item.lookupType || "Select",
//           empId: item.emplId,
//           employeeName:
//             item.employeeName ||
//             employees.find((emp) => emp.empId === item.emplId)?.employeeName ||
//             "",
//           plc: item.billLabCatCd,
//           plcDescription: item.plcDescription || "",
//           billRate: item.billRtAmt,
//           rateType: item.sBillRtTypeCd || "Select",
//           startDate: item.startDt ? item.startDt.split("T")[0] : "",
//           endDate: item.endDt ? item.endDt.split("T")[0] : null,
//         }))
//       );
//       const newEditEmployeeBillRate = {};
//       filteredData.forEach((item) => {
//         newEditEmployeeBillRate[item.id] = item.billRtAmt;
//       });
//       setEditEmployeeBillRate(newEditEmployeeBillRate);
//     } catch (error) {
//       console.error(
//         "Error adding employee billing rate:",
//         error.response ? error.response.data : error.message
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEmployeeBillRateChange = (id, value) => {
//     setEditEmployeeBillRate((prev) => ({
//       ...prev,
//       [id]: value === "" ? "" : parseFloat(value) || 0,
//     }));
//   };

//   const handleUpdateEmployee = async (id, updatedData) => {
//     setLoading(true);
//     try {
//       await axios.put(`https://test-api-3tmq.onrender.com/ProjEmplRt/${id}`, {
//         id,
//         projId: selectedProjectId,
//         emplId: updatedData.empId,
//         employeeName: updatedData.employeeName,
//         billLabCatCd: updatedData.plc,
//         billRtAmt: parseFloat(updatedData.billRate),
//         startDt: updatedData.startDate,
//         endDt: updatedData.endDate || null,
//         sBillRtTypeCd: updatedData.rateType,
//         lookupType: updatedData.lookupType,
//         isActive: true,
//         modifiedBy: "admin",
//       });
//       setEmployeeBillingRates((prev) =>
//         prev.map((rate) =>
//           rate.id === id
//             ? {
//                 ...rate,
//                 lookupType: updatedData.lookupType,
//                 empId: updatedData.empId,
//                 employeeName: updatedData.employeeName,
//                 plc: updatedData.plc,
//                 plcDescription: plcs.find((plc) => plc.laborCategoryCode === updatedData.plc)?.description || updatedData.plcDescription,
//                 billRate: parseFloat(updatedData.billRate),
//                 rateType: updatedData.rateType,
//                 startDate: updatedData.startDate,
//                 endDate: updatedData.endDate || null,
//               }
//             : rate
//         )
//       );
//       setEditEmployeeBillRate((prev) => ({
//         ...prev,
//         [id]: updatedData.billRate,
//       }));
//     } catch (error) {
//       console.error("Error updating employee billing rate:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteEmployee = async (id) => {
//     setLoading(true);
//     try {
//       await axios.delete(`https://test-api-3tmq.onrender.com/ProjEmplRt/${id}`);
//       setEmployeeBillingRates((prev) => prev.filter((rate) => rate.id !== id));
//       setEditEmployeeBillRate((prev) => {
//         const newEditEmployeeBillRate = { ...prev };
//         delete newEditEmployeeBillRate[id];
//         return newEditEmployeeBillRate;
//       });
//     } catch (error) {
//       console.error("Error deleting employee billing rate:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleNewEmployeeRateChange = (field, value, id = null) => {
//     if (id) {
//       const selectedEmp =
//         field === "empId" ? employees.find((emp) => emp.empId === value) : null;
//       setEmployeeBillingRates((prev) =>
//         prev.map((rate) =>
//           rate.id === id
//             ? {
//                 ...rate,
//                 [field]: value,
//                 ...(field === "empId" && selectedEmp
//                   ? { employeeName: selectedEmp.employeeName }
//                   : {}),
//               }
//             : rate
//         )
//       );
//     } else {
//       const selectedEmp =
//         field === "empId" ? employees.find((emp) => emp.empId === value) : null;
//       setNewEmployeeRate((prev) => ({
//         ...prev,
//         [field]: value,
//         ...(field === "empId" && selectedEmp
//           ? { employeeName: selectedEmp.employeeName }
//           : {}),
//       }));
//     }
//   };

//   // Vendor Billing Rates Handlers
//   const handleAddVendorRow = () => {
//     setNewVendorRate({
//       lookupType: "Select",
//       vendorId: "",
//       vendorName: "",
//       vendorEmployee: "",
//       vendorEmployeeName: "",
//       plc: "",
//       billRate: "",
//       rateType: "Select",
//       startDate: "",
//       endDate: "",
//     });
//   };

//   const handleSaveNewVendorRate = async () => {
//     if (
//       !newVendorRate ||
//       !newVendorRate.vendorId ||
//       !newVendorRate.vendorName ||
//       !newVendorRate.plc ||
//       !newVendorRate.startDate ||
//       !newVendorRate.billRate
//     ) {
//       console.error(
//         "Please fill all required fields (Vendor ID, Vendor Name, PLC, Bill Rate, Start Date)"
//       );
//       return;
//     }
//     setLoading(true);
//     try {
//       await axios.post(`https://test-api-3tmq.onrender.com/ProjVendRt`, {
//         projVendRtKey: 0,
//         projId: selectedPlan?.projId,
//         vendId: newVendorRate.vendorId,
//         vendEmplId: newVendorRate.vendorEmployee,
//         billLabCatCd: newVendorRate.plc,
//         billDiscRt: 0,
//         companyId: "1",
//         billRtAmt: parseFloat(newVendorRate.billRate),
//         startDt: new Date(newVendorRate.startDate).toISOString(),
//         endDt: newVendorRate.endDate
//           ? new Date(newVendorRate.endDate).toISOString()
//           : null,
//         sBillRtTypeCd: newVendorRate.rateType,
//         modifiedBy: "admin",
//         timeStamp: new Date().toISOString(),
//       });
//       setNewVendorRate(null);
//       const fetchResponse = await axios.get(
//         `https://test-api-3tmq.onrender.com/ProjVendRt`
//       );
//       const filteredData = fetchResponse.data.filter((item) =>
//         item.projId.toLowerCase().startsWith(selectedProjectId.toLowerCase())
//       );
//       setVendorBillingRates(
//         filteredData.map((item) => ({
//           id: item.id,
//           lookupType: item.lookupType || "Select",
//           vendorId: item.vendId || "",
//           vendorName: item.vendorName || "",
//           vendorEmployee: item.vendEmplId || "",
//           vendorEmployeeName: item.vendEmplName || "",
//           plc: item.billLabCatCd,
//           plcDescription: item.description || "",
//           billRate: item.billRtAmt,
//           rateType: item.sBillRtTypeCd || "Select",
//           startDate: new Date(item.startDt).toISOString().split("T")[0],
//           endDate: item.endDt
//             ? new Date(item.endDt).toISOString().split("T")[0]
//             : null,
//         }))
//       );
//     } catch (error) {
//       console.error(
//         "Error adding vendor billing rate:",
//         error.response ? error.response.data : error.message
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVendorBillRateChange = (id, value) => {
//     setEditVendorBillRate((prev) => ({
//       ...prev,
//       [id]: value === "" ? "" : parseFloat(value) || 0,
//     }));
//   };

//   const handleUpdateVendor = async (id, updatedData) => {
//     setLoading(true);
//     try {
//       await axios.put(`https://test-api-3tmq.onrender.com/ProjVendRt/${id}`, {
//         id,
//         projId: selectedProjectId,
//         vendId: updatedData.vendorId,
//         vendEmplId: updatedData.vendorEmployee,
//         billLabCatCd: updatedData.plc,
//         billDiscRt: 0,
//         companyId: "1",
//         billRtAmt: parseFloat(updatedData.billRate),
//         startDt: new Date(updatedData.startDate).toISOString(),
//         endDt: updatedData.endDate
//           ? new Date(updatedData.endDate).toISOString()
//           : null,
//         sBillRtTypeCd: updatedData.rateType,
//         modifiedBy: "admin",
//         timeStamp: new Date().toISOString(),
//       });
//       setVendorBillingRates((prev) =>
//         prev.map((rate) =>
//           rate.id === id
//             ? {
//                 ...rate,
//                 lookupType: updatedData.lookupType,
//                 vendorId: updatedData.vendorId,
//                 vendorName: updatedData.vendorName,
//                 vendorEmployee: updatedData.vendorEmployee,
//                 vendorEmployeeName: updatedData.vendorEmployeeName,
//                 plc: updatedData.plc,
//                 plcDescription: plcs.find((plc) => plc.laborCategoryCode === updatedData.plc)?.description || updatedData.plcDescription,
//                 billRate: parseFloat(updatedData.billRate),
//                 rateType: updatedData.rateType,
//                 startDate: updatedData.startDate,
//                 endDate: updatedData.endDate || null,
//               }
//             : rate
//         )
//       );
//       setEditVendorBillRate((prev) => ({
//         ...prev,
//         [id]: updatedData.billRate,
//       }));
//     } catch (error) {
//       console.error("Error updating vendor billing rate:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteVendor = async (id) => {
//     setLoading(true);
//     try {
//       await axios.delete(`https://test-api-3tmq.onrender.com/ProjVendRt/${id}`);
//       setVendorBillingRates((prev) => prev.filter((rate) => rate.id !== id));
//       setEditVendorBillRate((prev) => {
//         const newEditVendorBillRate = { ...prev };
//         delete newEditVendorBillRate[id];
//         return newEditVendorBillRate;
//       });
//     } catch (error) {
//       console.error("Error deleting vendor billing rate:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleNewVendorRateChange = (field, value) => {
//     setNewVendorRate((prev) => ({ ...prev, [field]: value }));
//   };

//   return (
//     <div className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16 text-xs">
//       <div className="mb-4">
//         <h3 className="text-xs font-normal">
//           Project Labor Categories Billing Rates Schedule
//         </h3>
//         <div className="overflow-x-auto">
//           <table className="w-full text-xs border-collapse">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="border p-1 font-normal">Plc</th>
//                 <th className="border p-1 font-normal">Bill Rate</th>
//                 <th className="border p-1 font-normal">Rate Type</th>
//                 <th className="border p-1 font-normal">Start Date</th>
//                 <th className="border p-1 font-normal">End Date</th>
//                 <th className="border p-1 font-normal">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="6" className="border p-1 text-center">
//                     Loading...
//                   </td>
//                 </tr>
//               ) : billingRatesSchedule.length === 0 ? (
//                 <tr>
//                   <td colSpan="6" className="border p-1 text-center">
//                     No data available
//                   </td>
//                 </tr>
//               ) : (
//                 billingRatesSchedule.map((item) => (
//                   <tr
//                     key={item.id}
//                     className="sm:table-row flex flex-col sm:flex-row mb-1 sm:mb-0"
//                   >
//                     <td className="border p-1 sm:w-1/6">
//                       <input
//                         type="text"
//                         value={item.plc}
//                         onChange={(e) => {
//                           handleNewRateChange("plc", e.target.value);
//                           setPlcSearch(e.target.value);
//                         }}
//                         className="w-full p-1 border rounded text-xs"
//                         list="plc-list"
//                       />
//                       <datalist id="plc-list">
//                         {plcs.map((plc) => (
//                           <option
//                             key={plc.laborCategoryCode}
//                             value={plc.laborCategoryCode}
//                           >
//                             {plc.description}
//                           </option>
//                         ))}
//                       </datalist>
//                     </td>
//                     <td className="border p-1 sm:w-1/6">
//                       <input
//                         type="text"
//                         value={editBillRate[item.id] ?? item.billRate}
//                         onChange={(e) =>
//                           handleBillRateChange(item.id, e.target.value)
//                         }
//                         className="w-full p-1 border rounded text-xs"
//                       />
//                     </td>
//                     <td className="border p-1 sm:w-1/6">
//                       <select
//                         value={item.rateType}
//                         onChange={(e) =>
//                           handleNewRateChange("rateType", e.target.value)
//                         }
//                         className="w-full p-1 border rounded text-xs"
//                       >
//                         {rateTypeOptions.map((option) => (
//                           <option key={option} value={option}>
//                             {option}
//                           </option>
//                         ))}
//                       </select>
//                     </td>
//                     <td className="border p-1 sm:w-1/6">
//                       <input
//                         type="date"
//                         value={item.startDate}
//                         onChange={(e) =>
//                           handleNewRateChange("startDate", e.target.value)
//                         }
//                         className="w-full p-1 border rounded text-xs"
//                       />
//                     </td>
//                     <td className="border p-1 sm:w-1/6">
//                       <input
//                         type="date"
//                         value={item.endDate || ""}
//                         onChange={(e) =>
//                           handleNewRateChange("endDate", e.target.value)
//                         }
//                         className="w-full p-1 border rounded text-xs"
//                       />
//                     </td>
//                     <td className="border p-1 sm:w-1/6">
//                       <div className="flex flex-col sm:flex-row justify-center space-y-1 sm:space-y-0 sm:space-x-1">
//                         <button
//                           onClick={() =>
//                             handleUpdate(item.id, {
//                               ...item,
//                               billRate: editBillRate[item.id] || item.billRate,
//                             })
//                           }
//                           className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-yellow-600 transition w-full sm:w-auto"
//                           disabled={loading}
//                         >
//                           Update
//                         </button>
//                         <button
//                           onClick={() => handleDelete(item.id)}
//                           className="bg-red-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-red-600 transition w-full sm:w-auto"
//                           disabled={loading}
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//               {newRate && (
//                 <tr className="sm:table-row flex flex-col sm:flex-row mb-1 sm:mb-0">
//                   <td className="border p-1 sm:w-1/6">
//                     <input
//                       type="text"
//                       value={newRate.plc || ""}
//                       onChange={(e) => {
//                         handleNewRateChange("plc", e.target.value);
//                         setPlcSearch(e.target.value);
//                       }}
//                       className="w-full p-1 border rounded text-xs"
//                       list="plc-list"
//                     />
//                     <datalist id="plc-list">
//                       {plcs.map((plc) => (
//                         <option
//                           key={plc.laborCategoryCode}
//                           value={plc.laborCategoryCode}
//                         >
//                           {plc.description}
//                         </option>
//                       ))}
//                     </datalist>
//                   </td>
//                   <td className="border p-1 sm:w-1/6">
//                     <input
//                       type="text"
//                       value={newRate.billRate || ""}
//                       onChange={(e) =>
//                         handleNewRateChange("billRate", e.target.value)
//                       }
//                       className="w-full p-1 border rounded text-xs"
//                     />
//                   </td>
//                   <td className="border p-1 sm:w-1/6">
//                     <select
//                       value={newRate.rateType}
//                       onChange={(e) =>
//                         handleNewRateChange("rateType", e.target.value)
//                       }
//                       className="w-full p-1 border rounded text-xs"
//                     >
//                       {rateTypeOptions.map((option) => (
//                         <option key={option} value={option}>
//                           {option}
//                         </option>
//                       ))}
//                     </select>
//                   </td>
//                   <td className="border p-1 sm:w-1/6">
//                     <input
//                       type="date"
//                       value={newRate.startDate || ""}
//                       onChange={(e) =>
//                         handleNewRateChange("startDate", e.target.value)
//                       }
//                       className="w-full p-1 border rounded text-xs"
//                     />
//                   </td>
//                   <td className="border p-1 sm:w-1/6">
//                     <input
//                       type="date"
//                       value={newRate.endDate || ""}
//                       onChange={(e) =>
//                         handleNewRateChange("endDate", e.target.value)
//                       }
//                       className="w-full p-1 border rounded text-xs"
//                     />
//                   </td>
//                   <td className="border p-1 sm:w-1/6">
//                     <div className="flex flex-col sm:flex-row justify-center space-y-1 sm:space-y-0 sm:space-x-1">
//                       <button
//                         onClick={handleSaveNewRate}
//                         className="bg-green-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-green-600 transition w-full sm:w-auto"
//                         disabled={loading}
//                       >
//                         Save
//                       </button>
//                       <button
//                         onClick={() => setNewRate(null)}
//                         className="bg-gray-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-gray-600 transition w-full sm:w-auto"
//                         disabled={loading}
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               )}
//               <tr>
//                 <td colSpan="6" className="border p-1">
//                   <button
//                     onClick={handleAddRow}
//                     className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-blue-600 transition"
//                     disabled={loading || newRate}
//                   >
//                     Add
//                   </button>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <div className="mb-4">
//         <h3 className="text-xs font-normal">Employee Billing Rates Schedule</h3>
//         <div className="overflow-x-auto">
//           <table className="w-full text-xs border-collapse">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="border p-1 font-normal">Lookup Type</th>
//                 <th className="border p-1 font-normal">Employee</th>
//                 <th className="border p-1 font-normal">Employee Name</th>
//                 <th className="border p-1 font-normal">PLC</th>
//                 <th className="border p-1 font-normal">PLC Description</th>
//                 <th className="border p-1 font-normal">Bill Rate</th>
//                 <th className="border p-1 font-normal">Rate Type</th>
//                 <th className="border p-1 font-normal">Start Date</th>
//                 <th className="border p-1 font-normal">End Date</th>
//                 <th className="border p-1 font-normal">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="10" className="border p-1 text-center">
//                     Loading...
//                   </td>
//                 </tr>
//               ) : employeeBillingRates.length === 0 && !newEmployeeRate ? (
//                 <tr>
//                   <td colSpan="10" className="border p-1 text-center">
//                     No data available
//                   </td>
//                 </tr>
//               ) : (
//                 employeeBillingRates.map((item) => (
//                   <tr
//                     key={item.id}
//                     className="sm:table-row flex flex-col sm:flex-row mb-1 sm:mb-0"
//                   >
//                     <td className="border p-1 sm:w-1/10">
//                       <select
//                         value={item.lookupType}
//                         onChange={(e) =>
//                           handleNewEmployeeRateChange(
//                             "lookupType",
//                             e.target.value,
//                             item.id
//                           )
//                         }
//                         className="w-full p-1 border rounded text-xs"
//                       >
//                         {lookupTypeOptions.map((option) => (
//                           <option key={option} value={option}>
//                             {option}
//                           </option>
//                         ))}
//                       </select>
//                     </td>
//                     <td className="border p-1 sm:w-1/10">
//                       <input
//                         type="text"
//                         value={item.empId}
//                         onChange={(e) =>
//                           handleNewEmployeeRateChange(
//                             "empId",
//                             e.target.value,
//                             item.id
//                           )
//                         }
//                         className="w-full p-1 border rounded text-xs"
//                         list="employee-list"
//                         disabled={employees.length === 0}
//                       />
//                       <datalist id="employee-list">
//                         {employees.map((emp) => (
//                           <option key={emp.empId} value={emp.empId}>
//                             {emp.employeeName}
//                           </option>
//                         ))}
//                       </datalist>
//                     </td>
//                     <td className="border p-1 sm:w-1/10">
//                       {item.employeeName}
//                     </td>
//                     <td className="border p-1 sm:w-1/10">
//                       <input
//                         type="text"
//                         value={item.plc}
//                         onChange={(e) => {
//                           handleNewEmployeeRateChange(
//                             "plc",
//                             e.target.value,
//                             item.id
//                           );
//                           setPlcSearch(e.target.value);
//                         }}
//                         className="w-full p-1 border rounded text-xs"
//                         list="plc-list"
//                         disabled
//                       />
//                       <datalist id="plc-list">
//                         {plcs.map((plc) => (
//                           <option
//                             key={plc.laborCategoryCode}
//                             value={plc.laborCategoryCode}
//                           >
//                             {plc.description}
//                           </option>
//                         ))}
//                       </datalist>
//                     </td>
//                     <td className="border p-1 sm:w-1/10">
//                       {plcs.find((plc) => plc.laborCategoryCode === item.plc)
//                         ?.description || item.plcDescription}
//                         {/* {item.plcDescription} */}
//                     </td>
//                     <td className="border p-1 sm:w-1/10">
//                       <input
//                         type="text"
//                         value={editEmployeeBillRate[item.id] ?? item.billRate}
//                         onChange={(e) =>
//                           handleEmployeeBillRateChange(item.id, e.target.value)
//                         }
//                         className="w-full p-1 border rounded text-xs"
//                       />
//                     </td>
//                     <td className="border p-1 sm:w-1/10">
//                       <select
//                         value={item.rateType}
//                         onChange={(e) =>
//                           handleNewEmployeeRateChange(
//                             "rateType",
//                             e.target.value,
//                             item.id
//                           )
//                         }
//                         className="w-full p-1 border rounded text-xs"
//                       >
//                         {rateTypeOptions.map((option) => (
//                           <option key={option} value={option}>
//                             {option}
//                           </option>
//                         ))}
//                       </select>
//                     </td>
//                     <td className="border p-1 sm:w-1/10">
//                       <input
//                         type="date"
//                         value={item.startDate}
//                         onChange={(e) =>
//                           handleNewEmployeeRateChange(
//                             "startDate",
//                             e.target.value,
//                             item.id
//                           )
//                         }
//                         className="w-full p-1 border rounded text-xs"
//                       />
//                     </td>
//                     <td className="border p-1 sm:w-1/10">
//                       <input
//                         type="date"
//                         value={item.endDate || ""}
//                         onChange={(e) =>
//                           handleNewEmployeeRateChange(
//                             "endDate",
//                             e.target.value,
//                             item.id
//                           )
//                         }
//                         className="w-full p-1 border rounded text-xs"
//                       />
//                     </td>
//                     <td className="border p-1 sm:w-1/10">
//                       <div className="flex flex-col sm:flex-row justify-center space-y-1 sm:space-y-0 sm:space-x-1">
//                         <button
//                           onClick={() =>
//                             handleUpdateEmployee(item.id, {
//                               ...item,
//                               billRate:
//                                 editEmployeeBillRate[item.id] || item.billRate,
//                             })
//                           }
//                           className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-yellow-600 transition w-full sm:w-auto"
//                           disabled={loading}
//                         >
//                           Update
//                         </button>
//                         <button
//                           onClick={() => handleDeleteEmployee(item.id)}
//                           className="bg-red-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-red-600 transition w-full sm:w-auto"
//                           disabled={loading}
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//               {newEmployeeRate && (
//                 <tr className="sm:table-row flex flex-col sm:flex-row mb-1 sm:mb-0">
//                   <td className="border p-1 sm:w-1/10">
//                     <select
//                       value={newEmployeeRate.lookupType}
//                       onChange={(e) =>
//                         handleNewEmployeeRateChange(
//                           "lookupType",
//                           e.target.value
//                         )
//                       }
//                       className="w-full p-1 border rounded text-xs"
//                     >
//                       {lookupTypeOptions.map((option) => (
//                         <option key={option} value={option}>
//                           {option}
//                         </option>
//                       ))}
//                     </select>
//                   </td>
//                   <td className="border p-1 sm:w-1/10">
//                     <input
//                       type="text"
//                       value={newEmployeeRate.empId || ""}
//                       onChange={(e) =>
//                         handleNewEmployeeRateChange("empId", e.target.value)
//                       }
//                       className="w-full p-1 border rounded text-xs"
//                       list="employee-list"
//                       disabled={employees.length === 0}
//                     />
//                     <datalist id="employee-list">
//                       {employees.map((emp) => (
//                         <option key={emp.empId} value={emp.empId}>
//                           {emp.employeeName}
//                         </option>
//                       ))}
//                     </datalist>
//                   </td>
//                   <td className="border p-1 sm:w-1/10">
//                     {newEmployeeRate.employeeName || ""}
//                   </td>
//                   <td className="border p-1 sm:w-1/10">
//                     <input
//                       type="text"
//                       value={newEmployeeRate.plc || ""}
//                       onChange={(e) => {
//                         handleNewEmployeeRateChange("plc", e.target.value);
//                         setPlcSearch(e.target.value);
//                       }}
//                       className="w-full p-1 border rounded text-xs"
//                       list="plc-list"
//                     />
//                     <datalist id="plc-list">
//                       {plcs.map((plc) => (
//                         <option
//                           key={plc.laborCategoryCode}
//                           value={plc.laborCategoryCode}
//                         >
//                           {plc.description}
//                         </option>
//                       ))}
//                     </datalist>
//                   </td>
//                   <td className="border p-1 sm:w-1/10">
//                     {plcs.find(
//                       (plc) => plc.laborCategoryCode === newEmployeeRate.plc
//                     )?.description || ""}
//                   </td>
//                   <td className="border p-1 sm:w-1/10">
//                     <input
//                       type="text"
//                       value={newEmployeeRate.billRate || ""}
//                       onChange={(e) =>
//                         handleNewEmployeeRateChange("billRate", e.target.value)
//                       }
//                       className="w-full p-1 border rounded text-xs"
//                     />
//                   </td>
//                   <td className="border p-1 sm:w-1/10">
//                     <select
//                       value={newEmployeeRate.rateType}
//                       onChange={(e) =>
//                         handleNewEmployeeRateChange("rateType", e.target.value)
//                       }
//                       className="w-full p-1 border rounded text-xs"
//                     >
//                       {rateTypeOptions.map((option) => (
//                         <option key={option} value={option}>
//                           {option}
//                         </option>
//                       ))}
//                     </select>
//                   </td>
//                   <td className="border p-1 sm:w-1/10">
//                     <input
//                       type="date"
//                       value={newEmployeeRate.startDate || ""}
//                       onChange={(e) =>
//                         handleNewEmployeeRateChange("startDate", e.target.value)
//                       }
//                       className="w-full p-1 border rounded text-xs"
//                     />
//                   </td>
//                   <td className="border p-1 sm:w-1/10">
//                     <input
//                       type="date"
//                       value={newEmployeeRate.endDate || ""}
//                       onChange={(e) =>
//                         handleNewEmployeeRateChange("endDate", e.target.value)
//                       }
//                       className="w-full p-1 border rounded text-xs"
//                     />
//                   </td>
//                   <td className="border p-1 sm:w-1/10">
//                     <div className="flex flex-col sm:flex-row justify-center space-y-1 sm:space-y-0 sm:space-x-1">
//                       <button
//                         onClick={handleSaveNewEmployeeRate}
//                         className="bg-green-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-green-600 transition w-full sm:w-auto"
//                         disabled={loading}
//                       >
//                         Save
//                       </button>
//                       <button
//                         onClick={() => setNewEmployeeRate(null)}
//                         className="bg-gray-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-gray-600 transition w-full sm:w-auto"
//                         disabled={loading}
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               )}
//               <tr>
//                 <td colSpan="10" className="border p-1">
//                   <button
//                     onClick={handleAddEmployeeRow}
//                     className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-blue-600 transition"
//                     disabled={loading || newEmployeeRate}
//                   >
//                     Add
//                   </button>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <div className="mb-4">
//         <h3 className="text-xs font-normal">Vendor Billing Rates Schedule</h3>
//         <div className="overflow-x-auto">
//           <table className="w-full text-xs border-collapse">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="border p-1 font-normal">Lookup Type</th>
//                 <th className="border p-1 font-normal">Vendor</th>
//                 <th className="border p-1 font-normal">Vendor Name</th>
//                 <th className="border p-1 font-normal">Vendor Employee</th>
//                 <th className="border p-1 font-normal">Vendor Employee Name</th>
//                 <th className="border p-1 font-normal">PLC</th>
//                 <th className="border p-1 font-normal">PLC Description</th>
//                 <th className="border p-1 font-normal">Bill Rate</th>
//                 <th className="border p-1 font-normal">Rate Type</th>
//                 <th className="border p-1 font-normal">Start Date</th>
//                 <th className="border p-1 font-normal">End Date</th>
//                 <th className="border p-1 font-normal">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="12" className="border p-1 text-center">
//                     Loading...
//                   </td>
//                 </tr>
//               ) : vendorBillingRates.length === 0 ? (
//                 <tr>
//                   <td colSpan="12" className="border p-1 text-center">
//                     No data available
//                   </td>
//                 </tr>
//               ) : (
//                 vendorBillingRates.map((item) => (
//                   <tr
//                     key={item.id}
//                     className="sm:table-row flex flex-col sm:flex-row mb-1 sm:mb-0"
//                   >
//                     <td className="border p-1 sm:w-1/12">
//                       <select
//                         value={item.lookupType}
//                         onChange={(e) =>
//                           setVendorBillingRates((prev) =>
//                             prev.map((rate) =>
//                               rate.id === item.id
//                                 ? { ...rate, lookupType: e.target.value }
//                                 : rate
//                             )
//                           )
//                         }
//                         className="w-full p-1 border rounded text-xs"
//                       >
//                         {lookupTypeOptions.map((option) => (
//                           <option key={option} value={option}>
//                             {option}
//                           </option>
//                         ))}
//                       </select>
//                     </td>
//                     <td className="border p-1 sm:w-1/12">
//                       <input
//                         type="text"
//                         value={item.vendorId}
//                         onChange={(e) =>
//                           setVendorBillingRates((prev) =>
//                             prev.map((rate) =>
//                               rate.id === item.id
//                                 ? { ...rate, vendorId: e.target.value }
//                                 : rate
//                             )
//                           )
//                         }
//                         className="w-full p-1 border rounded text-xs"
//                       />
//                     </td>
//                     <td className="border p-1 sm:w-1/12">
//                       <input
//                         type="text"
//                         value={item.vendorName}
//                         onChange={(e) =>
//                           setVendorBillingRates((prev) =>
//                             prev.map((rate) =>
//                               rate.id === item.id
//                                 ? { ...rate, vendorName: e.target.value }
//                                 : rate
//                             )
//                           )
//                         }
//                         className="w-full p-1 border rounded text-xs"
//                       />
//                     </td>
//                     <td className="border p-1 sm:w-1/12">
//                       <input
//                         type="text"
//                         value={item.vendorEmployee}
//                         onChange={(e) =>
//                           setVendorBillingRates((prev) =>
//                             prev.map((rate) =>
//                               rate.id === item.id
//                                 ? { ...rate, vendorEmployee: e.target.value }
//                                 : rate
//                             )
//                           )
//                         }
//                         className="w-full p-1 border rounded text-xs"
//                       />
//                     </td>
//                     <td className="border p-1 sm:w-1/12">
//                       <input
//                         type="text"
//                         value={item.vendorEmployeeName}
//                         onChange={(e) =>
//                           setVendorBillingRates((prev) =>
//                             prev.map((rate) =>
//                               rate.id === item.id
//                                 ? {
//                                     ...rate,
//                                     vendorEmployeeName: e.target.value,
//                                   }
//                                 : rate
//                             )
//                           )
//                         }
//                         className="w-full p-1 border rounded text-xs"
//                       />
//                     </td>
//                     <td className="border p-1 sm:w-1/12">
//                       <input
//                         type="text"
//                         value={item.plc}
//                         onChange={(e) => {
//                           setVendorBillingRates((prev) =>
//                             prev.map((rate) =>
//                               rate.id === item.id
//                                 ? { ...rate, plc: e.target.value }
//                                 : rate
//                             )
//                           );
//                           setPlcSearch(e.target.value);
//                         }}
//                         className="w-full p-1 border rounded text-xs"
//                         list="plc-list"
//                       />
//                       <datalist id="plc-list">
//                         {plcs.map((plc) => (
//                           <option
//                             key={plc.laborCategoryCode}
//                             value={plc.laborCategoryCode}
//                           >
//                             {plc.description}
//                           </option>
//                         ))}
//                       </datalist>
//                     </td>
//                     <td className="border p-1 sm:w-1/12">
//                       {plcs.find((plc) => plc.laborCategoryCode === item.plc)
//                         ?.description || item.plcDescription}
//                     </td>
//                     <td className="border p-1 sm:w-1/12">
//                       <input
//                         type="text"
//                         value={editVendorBillRate[item.id] ?? item.billRate}
//                         onChange={(e) =>
//                           handleVendorBillRateChange(item.id, e.target.value)
//                         }
//                         className="w-full p-1 border rounded text-xs"
//                       />
//                     </td>
//                     <td className="border p-1 sm:w-1/12">
//                       <select
//                         value={item.rateType}
//                         onChange={(e) =>
//                           setVendorBillingRates((prev) =>
//                             prev.map((rate) =>
//                               rate.id === item.id
//                                 ? { ...rate, rateType: e.target.value }
//                                 : rate
//                             )
//                           )
//                         }
//                         className="w-full p-1 border rounded text-xs"
//                       >
//                         {rateTypeOptions.map((option) => (
//                           <option key={option} value={option}>
//                             {option}
//                           </option>
//                         ))}
//                       </select>
//                     </td>
//                     <td className="border p-1 sm:w-1/12">
//                       <input
//                         type="date"
//                         value={item.startDate}
//                         onChange={(e) =>
//                           setVendorBillingRates((prev) =>
//                             prev.map((rate) =>
//                               rate.id === item.id
//                                 ? { ...rate, startDate: e.target.value }
//                                 : rate
//                             )
//                           )
//                         }
//                         className="w-full p-1 border rounded text-xs"
//                       />
//                     </td>
//                     <td className="border p-1 sm:w-1/12">
//                       <input
//                         type="date"
//                         value={item.endDate || ""}
//                         onChange={(e) =>
//                           setVendorBillingRates((prev) =>
//                             prev.map((rate) =>
//                               rate.id === item.id
//                                 ? { ...rate, endDate: e.target.value }
//                                 : rate
//                             )
//                           )
//                         }
//                         className="w-full p-1 border rounded text-xs"
//                       />
//                     </td>
//                     <td className="border p-1 sm:w-1/12">
//                       <div className="flex flex-col sm:flex-row justify-center space-y-1 sm:space-y-0 sm:space-x-1">
//                         <button
//                           onClick={() =>
//                             handleUpdateVendor(item.id, {
//                               ...item,
//                               billRate:
//                                 editVendorBillRate[item.id] || item.billRate,
//                             })
//                           }
//                           className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-yellow-600 transition w-full sm:w-auto"
//                           disabled={loading}
//                         >
//                           Update
//                         </button>
//                         <button
//                           onClick={() => handleDeleteVendor(item.id)}
//                           className="bg-red-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-red-600 transition w-full sm:w-auto"
//                           disabled={loading}
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//               {newVendorRate && (
//                 <tr className="sm:table-row flex flex-col sm:flex-row mb-1 sm:mb-0">
//                   <td className="border p-1 sm:w-1/12">
//                     <select
//                       value={newVendorRate.lookupType}
//                       onChange={(e) =>
//                         handleNewVendorRateChange("lookupType", e.target.value)
//                       }
//                       className="w-full p-1 border rounded text-xs"
//                     >
//                       {lookupTypeOptions.map((option) => (
//                         <option key={option} value={option}>
//                           {option}
//                         </option>
//                       ))}
//                     </select>
//                   </td>
//                   <td className="border p-1 sm:w-1/12">
//                     <input
//                       type="text"
//                       value={newVendorRate.vendorId || ""}
//                       onChange={(e) =>
//                         handleNewVendorRateChange("vendorId", e.target.value)
//                       }
//                       className="w-full p-1 border rounded text-xs"
//                     />
//                   </td>
//                   <td className="border p-1 sm:w-1/12">
//                     <input
//                       type="text"
//                       value={newVendorRate.vendorName || ""}
//                       onChange={(e) =>
//                         handleNewVendorRateChange("vendorName", e.target.value)
//                       }
//                       className="w-full p-1 border rounded text-xs"
//                     />
//                   </td>
//                   <td className="border p-1 sm:w-1/12">
//                     <input
//                       type="text"
//                       value={newVendorRate.vendorEmployee || ""}
//                       onChange={(e) =>
//                         handleNewVendorRateChange(
//                           "vendorEmployee",
//                           e.target.value
//                         )
//                       }
//                       className="w-full p-1 border rounded text-xs"
//                     />
//                   </td>
//                   <td className="border p-1 sm:w-1/12">
//                     <input
//                       type="text"
//                       value={newVendorRate.vendorEmployeeName || ""}
//                       onChange={(e) =>
//                         handleNewVendorRateChange(
//                           "vendorEmployeeName",
//                           e.target.value
//                         )
//                       }
//                       className="w-full p-1 border rounded text-xs"
//                     />
//                   </td>
//                   <td className="border p-1 sm:w-1/12">
//                     <input
//                       type="text"
//                       value={newVendorRate.plc || ""}
//                       onChange={(e) => {
//                         handleNewVendorRateChange("plc", e.target.value);
//                         setPlcSearch(e.target.value);
//                       }}
//                       className="w-full p-1 border rounded text-xs"
//                       list="plc-list"
//                     />
//                     <datalist id="plc-list">
//                       {plcs.map((plc) => (
//                         <option
//                           key={plc.laborCategoryCode}
//                           value={plc.laborCategoryCode}
//                         >
//                           {plc.description}
//                         </option>
//                       ))}
//                     </datalist>
//                   </td>
//                   <td className="border p-1 sm:w-1/12">
//                     {plcs.find(
//                       (plc) => plc.laborCategoryCode === newVendorRate.plc
//                     )?.description || ""}
//                   </td>
//                   <td className="border p-1 sm:w-1/12">
//                     <input
//                       type="text"
//                       value={newVendorRate.billRate || ""}
//                       onChange={(e) =>
//                         handleNewVendorRateChange("billRate", e.target.value)
//                       }
//                       className="w-full p-1 border rounded text-xs"
//                     />
//                   </td>
//                   <td className="border p-1 sm:w-1/12">
//                     <select
//                       value={newVendorRate.rateType}
//                       onChange={(e) =>
//                         handleNewVendorRateChange("rateType", e.target.value)
//                       }
//                       className="w-full p-1 border rounded text-xs"
//                     >
//                       {rateTypeOptions.map((option) => (
//                         <option key={option} value={option}>
//                           {option}
//                         </option>
//                       ))}
//                     </select>
//                   </td>
//                   <td className="border p-1 sm:w-1/12">
//                     <input
//                       type="date"
//                       value={newVendorRate.startDate || ""}
//                       onChange={(e) =>
//                         handleNewVendorRateChange("startDate", e.target.value)
//                       }
//                       className="w-full p-1 border rounded text-xs"
//                     />
//                   </td>
//                   <td className="border p-1 sm:w-1/12">
//                     <input
//                       type="date"
//                       value={newVendorRate.endDate || ""}
//                       onChange={(e) =>
//                         handleNewVendorRateChange("endDate", e.target.value)
//                       }
//                       className="w-full p-1 border rounded text-xs"
//                     />
//                   </td>
//                   <td className="border p-1 sm:w-1/12">
//                     <div className="flex flex-col sm:flex-row justify-center space-y-1 sm:space-y-0 sm:space-x-1">
//                       <button
//                         onClick={handleSaveNewVendorRate}
//                         className="bg-green-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-green-600 transition w-full sm:w-auto"
//                         disabled={loading}
//                       >
//                         Save
//                       </button>
//                       <button
//                         onClick={() => setNewVendorRate(null)}
//                         className="bg-gray-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-gray-600 transition w-full sm:w-auto"
//                         disabled={loading}
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               )}
//               <tr>
//                 <td colSpan="12" className="border p-1">
//                   <button
//                     onClick={handleAddVendorRow}
//                     className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-blue-600 transition"
//                     disabled={loading || newVendorRate}
//                   >
//                     Add
//                   </button>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PLCComponent;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const PLCComponent = ({ selectedProjectId, selectedPlan }) => {
//   const [billingRatesSchedule, setBillingRatesSchedule] = useState([]);
//   const [newRate, setNewRate] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [editBillRate, setEditBillRate] = useState({});
//   const [employees, setEmployees] = useState([]);
//   const [employeeBillingRates, setEmployeeBillingRates] = useState([]);
//   const [newEmployeeRate, setNewEmployeeRate] = useState(null);
//   const [editEmployeeBillRate, setEditEmployeeBillRate] = useState({});
//   const [editEmployeeFields, setEditEmployeeFields] = useState({});
//   const [vendorBillingRates, setVendorBillingRates] = useState([]);
//   const [newVendorRate, setNewVendorRate] = useState(null);
//   const [editVendorBillRate, setEditVendorBillRate] = useState({});
//   const [plcs, setPlcs] = useState([]);
//   const [plcSearch, setPlcSearch] = useState("");

//   const lookupTypeOptions = ["Select", "Employee", "Contract Vendor"];
//   const rateTypeOptions = ["Select", "Billing", "Actual"];

//   // Fetch billing rates schedule based on selected project ID
//   useEffect(() => {
//     const fetchBillingRates = async () => {
//       if (!selectedProjectId) return;
//       setLoading(true);
//       try {
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/api/ProjectPlcRates`
//         );
//         const filteredData = response.data.filter((item) =>
//           item.projId.toLowerCase().startsWith(selectedProjectId.toLowerCase())
//         );
//         setBillingRatesSchedule(
//           filteredData.map((item) => ({
//             id: item.id,
//             plc: item.laborCategoryCode,
//             billRate: item.billingRate,
//             rateType: item.rateType || "Select",
//             startDate: item.effectiveDate
//               ? item.effectiveDate.split("T")[0]
//               : "",
//             endDate: item.endDate ? item.endDate.split("T")[0] : null,
//           }))
//         );
//         const newEditBillRate = {};
//         filteredData.forEach((item) => {
//           newEditBillRate[item.id] = item.billingRate;
//         });
//         setEditBillRate(newEditBillRate);
//       } catch (error) {
//         console.error("Error fetching billing rates:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBillingRates();
//   }, [selectedProjectId]);

//   // Fetch employees for the selected project
//   useEffect(() => {
//     const fetchEmployees = async () => {
//       if (
//         !selectedProjectId ||
//         typeof selectedProjectId !== "string" ||
//         selectedProjectId.trim() === ""
//       ) {
//         setEmployees([]);
//         return;
//       }
//       setLoading(true);
//       try {
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/Project/GetEmployeesByProject/${selectedProjectId}`
//         );
//         setEmployees(
//           response.data.map((item) => ({
//             empId: item.empId,
//             employeeName: item.employeeName,
//           }))
//         );
//       } catch (error) {
//         console.error("Error fetching employees:", error);
//         setEmployees([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchEmployees();
//   }, [selectedProjectId]);

//   // Fetch PLCs for search
//   useEffect(() => {
//     const fetchPlcs = async () => {
//       if (!plcSearch) return;
//       try {
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/Project/GetAllPlcs/${plcSearch}`
//         );
//         const filteredPlcs = response.data
//           .filter((item) =>
//             item.laborCategoryCode
//               .toLowerCase()
//               .includes(plcSearch.toLowerCase())
//           )
//           .map((item) => ({
//             laborCategoryCode: item.laborCategoryCode,
//             description: item.description || "",
//           }));
//         setPlcs(filteredPlcs);
//       } catch (error) {
//         console.error("Error fetching PLCs:", error);
//       }
//     };
//     fetchPlcs();
//   }, [plcSearch]);

//   // Fetch employee billing rates
//   useEffect(() => {
//     const fetchEmployeeBillingRates = async () => {
//       if (!selectedProjectId) return;
//       setLoading(true);
//       try {
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/ProjEmplRt`
//         );
//         const filteredData = response.data.filter(
//           (item) =>
//             item.projId
//               .toLowerCase()
//               .startsWith(selectedProjectId.toLowerCase()) && item.emplId
//         );
//         setEmployeeBillingRates(
//           filteredData.map((item) => ({
//             id: item.projEmplRtKey || item.id, // Use projEmplRtKey if id is undefined
//             lookupType: item.lookupType || "Select",
//             empId: item.emplId,
//             employeeName:
//               item.employeeName ||
//               employees.find((emp) => emp.empId === item.emplId)
//                 ?.employeeName ||
//               "",
//             plc: item.billLabCatCd,
//             plcDescription: item.plcDescription || "",
//             billRate: item.billRtAmt,
//             rateType: item.sBillRtTypeCd || "Select",
//             startDate: item.startDt ? item.startDt.split("T")[0] : "",
//             endDate: item.endDt ? item.endDt.split("T")[0] : null,
//           }))
//         );
//         const newEditEmployeeBillRate = {};
//         const newEditEmployeeFields = {};
//         filteredData.forEach((item) => {
//           const id = item.projEmplRtKey || item.id;
//           if (id) {
//             newEditEmployeeBillRate[id] = item.billRtAmt;
//             newEditEmployeeFields[id] = {
//               lookupType: item.lookupType || "Select",
//               rateType: item.sBillRtTypeCd || "Select",
//               startDate: item.startDt ? item.startDt.split("T")[0] : "",
//               endDate: item.endDt ? item.endDt.split("T")[0] : null,
//             };
//           }
//         });
//         setEditEmployeeBillRate(newEditEmployeeBillRate);
//         setEditEmployeeFields(newEditEmployeeFields);
//       } catch (error) {
//         console.error("Error fetching employee billing rates:", error);
//         setEmployeeBillingRates([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchEmployeeBillingRates();
//   }, [selectedProjectId, employees]);

//   // Fetch vendor billing rates
//   useEffect(() => {
//     const fetchVendorBillingRates = async () => {
//       if (!selectedProjectId) return;
//       setLoading(true);
//       try {
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/ProjVendRt`
//         );
//         const filteredData = response.data.filter((item) =>
//           item.projId.toLowerCase().startsWith(selectedProjectId.toLowerCase())
//         );
//         setVendorBillingRates(
//           filteredData.map((item) => ({
//             id: item.id,
//             lookupType: item.lookupType || "Select",
//             vendorId: item.vendId || "",
//             vendorName: item.vendorName || "",
//             vendorEmployee: item.vendEmplId || "",
//             vendorEmployeeName: item.vendEmplName || "",
//             plc: item.billLabCatCd,
//             plcDescription: item.description || "",
//             billRate: item.billRtAmt,
//             rateType: item.sBillRtTypeCd || "Select",
//             startDate: new Date(item.startDt).toISOString().split("T")[0],
//             endDate: item.endDt
//               ? new Date(item.endDt).toISOString().split("T")[0]
//               : null,
//           }))
//         );
//         const newEditVendorBillRate = {};
//         filteredData.forEach((item) => {
//           newEditVendorBillRate[item.id] = item.billRtAmt;
//         });
//         setEditVendorBillRate(newEditVendorBillRate);
//       } catch (error) {
//         console.error("Error fetching vendor billing rates:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchVendorBillingRates();
//   }, [selectedProjectId]);

//   const handleUpdate = async (id, updatedData) => {
//     setLoading(true);
//     try {
//       await axios.put(
//         `https://test-api-3tmq.onrender.com/api/ProjectPlcRates/${id}`,
//         {
//           id,
//           projId: selectedProjectId,
//           laborCategoryCode: updatedData.plc,
//           costRate: parseFloat(updatedData.billRate) * 0.65,
//           billingRate: parseFloat(updatedData.billRate),
//           effectiveDate: updatedData.startDate,
//           endDate: updatedData.endDate || null,
//           rateType: updatedData.rateType,
//           isActive: true,
//           modifiedBy: "admin",
//           createdAt: new Date().toISOString(),
//           updatedAt: new Date().toISOString(),
//         }
//       );
//       setBillingRatesSchedule((prev) =>
//         prev.map((rate) =>
//           rate.id === id
//             ? {
//                 ...rate,
//                 plc: updatedData.plc,
//                 billRate: parseFloat(updatedData.billRate),
//                 rateType: updatedData.rateType,
//                 startDate: updatedData.startDate,
//                 endDate: updatedData.endDate || null,
//               }
//             : rate
//         )
//       );
//       setEditBillRate((prev) => ({ ...prev, [id]: updatedData.billRate }));
//     } catch (error) {
//       console.error("Error updating billing rate:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     setLoading(true);
//     try {
//       await axios.delete(
//         `https://test-api-3tmq.onrender.com/api/ProjectPlcRates/${id}`
//       );
//       setBillingRatesSchedule((prev) => prev.filter((rate) => rate.id !== id));
//       setEditBillRate((prev) => {
//         const newEditBillRate = { ...prev };
//         delete newEditBillRate[id];
//         return newEditBillRate;
//       });
//     } catch (error) {
//       console.error("Error deleting billing rate:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddRow = () => {
//     setNewRate({
//       plc: "",
//       billRate: "",
//       rateType: "Select",
//       startDate: "",
//       endDate: "",
//     });
//   };

//   const handleSaveNewRate = async () => {
//     if (!newRate || !newRate.plc || !newRate.startDate || !newRate.billRate) {
//       console.error(
//         "Please fill all required fields (PLC, Bill Rate, Start Date)"
//       );
//       return;
//     }
//     setLoading(true);
//     try {
//       await axios.post(
//         `https://test-api-3tmq.onrender.com/api/ProjectPlcRates`,
//         {
//           id: 0,
//           projId: selectedProjectId,
//           laborCategoryCode: newRate.plc,
//           costRate: parseFloat(newRate.billRate) * 0.65,
//           billingRate: parseFloat(newRate.billRate),
//           effectiveDate: newRate.startDate,
//           endDate: newRate.endDate || null,
//           rateType: newRate.rateType,
//           isActive: true,
//           modifiedBy: "admin",
//           createdAt: new Date().toISOString(),
//           updatedAt: new Date().toISOString(),
//         }
//       );
//       setNewRate(null);
//       const fetchResponse = await axios.get(
//         `https://test-api-3tmq.onrender.com/api/ProjectPlcRates`
//       );
//       const filteredData = fetchResponse.data.filter((item) =>
//         item.projId.toLowerCase().startsWith(selectedProjectId.toLowerCase())
//       );
//       setBillingRatesSchedule(
//         filteredData.map((item) => ({
//           id: item.id,
//           plc: item.laborCategoryCode,
//           billRate: item.billingRate,
//           rateType: item.rateType || "Select",
//           startDate: item.effectiveDate ? item.effectiveDate.split("T")[0] : "",
//           endDate: item.endDate ? item.endDate.split("T")[0] : null,
//         }))
//       );
//     } catch (error) {
//       console.error(
//         "Error adding billing rate:",
//         error.response ? error.response.data : error.message
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleNewRateChange = (field, value) => {
//     setNewRate((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleBillRateChange = (id, value) => {
//     setEditBillRate((prev) => ({
//       ...prev,
//       [id]: value === "" ? "" : parseFloat(value) || 0,
//     }));
//   };

//   // Employee Billing Rates Handlers
//   const handleAddEmployeeRow = () => {
//     setNewEmployeeRate({
//       lookupType: "Select",
//       empId: "",
//       employeeName: "",
//       plc: "",
//       billRate: "",
//       rateType: "Select",
//       startDate: "",
//       endDate: "",
//     });
//   };

//   const handleSaveNewEmployeeRate = async () => {
//     if (
//       !newEmployeeRate ||
//       !newEmployeeRate.empId ||
//       !newEmployeeRate.plc ||
//       !newEmployeeRate.startDate ||
//       !newEmployeeRate.billRate
//     ) {
//       console.error(
//         "Please fill all required fields (Employee, PLC, Bill Rate, Start Date)"
//       );
//       return;
//     }
//     setLoading(true);
//     try {
//       await axios.post(`https://test-api-3tmq.onrender.com/ProjEmplRt`, {
//         id: 0,
//         projId: selectedProjectId,
//         emplId: newEmployeeRate.empId,
//         employeeName: newEmployeeRate.employeeName,
//         billLabCatCd: newEmployeeRate.plc,
//         billRtAmt: parseFloat(newEmployeeRate.billRate),
//         startDt: newEmployeeRate.startDate,
//         endDt: newEmployeeRate.endDate || null,
//         sBillRtTypeCd: newEmployeeRate.rateType,
//         lookupType: newEmployeeRate.lookupType,
//         isActive: true,
//         modifiedBy: "admin",
//       });
//       setNewEmployeeRate(null);
//       const fetchResponse = await axios.get(
//         `https://test-api-3tmq.onrender.com/ProjEmplRt`
//       );
//       const filteredData = fetchResponse.data.filter(
//         (item) =>
//           item.projId
//             .toLowerCase()
//             .startsWith(selectedProjectId.toLowerCase()) && item.emplId
//       );
//       setEmployeeBillingRates(
//         filteredData.map((item) => ({
//           id: item.projEmplRtKey || item.id,
//           lookupType: item.lookupType || "Select",
//           empId: item.emplId,
//           employeeName:
//             item.employeeName ||
//             employees.find((emp) => emp.empId === item.emplId)?.employeeName ||
//             "",
//           plc: item.billLabCatCd,
//           plcDescription: item.plcDescription || "",
//           billRate: item.billRtAmt,
//           rateType: item.sBillRtTypeCd || "Select",
//           startDate: item.startDt ? item.startDt.split("T")[0] : "",
//           endDate: item.endDt ? item.endDt.split("T")[0] : null,
//         }))
//       );
//       const newEditEmployeeBillRate = {};
//       const newEditEmployeeFields = {};
//       filteredData.forEach((item) => {
//         const id = item.projEmplRtKey || item.id;
//         if (id) {
//           newEditEmployeeBillRate[id] = item.billRtAmt;
//           newEditEmployeeFields[id] = {
//             lookupType: item.lookupType || "Select",
//             rateType: item.sBillRtTypeCd || "Select",
//             startDate: item.startDt ? item.startDt.split("T")[0] : "",
//             endDate: item.endDt ? item.endDt.split("T")[0] : null,
//           };
//         }
//       });
//       setEditEmployeeBillRate(newEditEmployeeBillRate);
//       setEditEmployeeFields(newEditEmployeeFields);
//     } catch (error) {
//       console.error(
//         "Error adding employee billing rate:",
//         error.response ? error.response.data : error.message
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEmployeeBillRateChange = (id, value) => {
//     setEditEmployeeBillRate((prev) => ({
//       ...prev,
//       [id]: value === "" ? "" : parseFloat(value) || 0,
//     }));
//   };

//   const handleUpdateEmployee = async (id, updatedData) => {
//     if (!id) {
//       console.error("Invalid ID for update");
//       return;
//     }
//     setLoading(true);
//     try {
//       const fields = editEmployeeFields[id] || {};
//       await axios.put(`https://test-api-3tmq.onrender.com/ProjEmplRt/${id}`, {
//         id,
//         projId: selectedProjectId,
//         emplId: updatedData.empId,
//         employeeName: updatedData.employeeName,
//         billLabCatCd: updatedData.plc,
//         billRtAmt: parseFloat(editEmployeeBillRate[id] || updatedData.billRate),
//         startDt: fields.startDate || updatedData.startDate,
//         endDt: fields.endDate || updatedData.endDate || null,
//         sBillRtTypeCd: fields.rateType || updatedData.rateType,
//         lookupType: fields.lookupType || updatedData.lookupType,
//         isActive: true,
//         modifiedBy: "admin",
//       });
//       setEmployeeBillingRates((prev) =>
//         prev.map((rate) =>
//           rate.id === id
//             ? {
//                 ...rate,
//                 lookupType: fields.lookupType || updatedData.lookupType,
//                 empId: updatedData.empId,
//                 employeeName: updatedData.employeeName,
//                 plc: updatedData.plc,
//                 plcDescription: plcs.find((plc) => plc.laborCategoryCode === updatedData.plc)?.description || updatedData.plcDescription,
//                 billRate: parseFloat(editEmployeeBillRate[id] || updatedData.billRate),
//                 rateType: fields.rateType || updatedData.rateType,
//                 startDate: fields.startDate || updatedData.startDate,
//                 endDate: fields.endDate || updatedData.endDate || null,
//               }
//             : rate
//         )
//       );
//       setEditEmployeeBillRate((prev) => ({
//         ...prev,
//         [id]: parseFloat(editEmployeeBillRate[id] || updatedData.billRate),
//       }));
//     } catch (error) {
//       console.error("Error updating employee billing rate:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteEmployee = async (id) => {
//     if (!id) {
//       console.error("Invalid ID for deletion");
//       return;
//     }
//     setLoading(true);
//     try {
//       await axios.delete(`https://test-api-3tmq.onrender.com/ProjEmplRt/${id}`);
//       setEmployeeBillingRates((prev) => prev.filter((rate) => rate.id !== id));
//       setEditEmployeeBillRate((prev) => {
//         const newEditEmployeeBillRate = { ...prev };
//         delete newEditEmployeeBillRate[id];
//         return newEditEmployeeBillRate;
//       });
//       setEditEmployeeFields((prev) => {
//         const newEditEmployeeFields = { ...prev };
//         delete newEditEmployeeFields[id];
//         return newEditEmployeeFields;
//       });
//     } catch (error) {
//       console.error("Error deleting employee billing rate:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleNewEmployeeRateChange = (field, value, id = null) => {
//     if (id) {
//       if (field === "empId") {
//         const selectedEmp = employees.find((emp) => emp.empId === value);
//         setEmployeeBillingRates((prev) =>
//           prev.map((rate) =>
//             rate.id === id
//               ? {
//                   ...rate,
//                   empId: value,
//                   employeeName: selectedEmp ? selectedEmp.employeeName : rate.employeeName,
//                 }
//               : rate
//           )
//         );
//       } else {
//         setEditEmployeeFields((prev) => ({
//           ...prev,
//           [id]: {
//             ...prev[id],
//             [field]: value,
//           },
//         }));
//       }
//     } else {
//       const selectedEmp =
//         field === "empId" ? employees.find((emp) => emp.empId === value) : null;
//       setNewEmployeeRate((prev) => ({
//         ...prev,
//         [field]: value,
//         ...(field === "empId" && selectedEmp
//           ? { employeeName: selectedEmp.employeeName }
//           : {}),
//       }));
//     }
//   };

//   // Vendor Billing Rates Handlers
//   const handleAddVendorRow = () => {
//     setNewVendorRate({
//       lookupType: "Select",
//       vendorId: "",
//       vendorName: "",
//       vendorEmployee: "",
//       vendorEmployeeName: "",
//       plc: "",
//       billRate: "",
//       rateType: "Select",
//       startDate: "",
//       endDate: "",
//     });
//   };

//   const handleSaveNewVendorRate = async () => {
//     if (
//       !newVendorRate ||
//       !newVendorRate.vendorId ||
//       !newVendorRate.vendorName ||
//       !newVendorRate.plc ||
//       !newVendorRate.startDate ||
//       !newVendorRate.billRate
//     ) {
//       console.error(
//         "Please fill all required fields (Vendor ID, Vendor Name, PLC, Bill Rate, Start Date)"
//       );
//       return;
//     }
//     setLoading(true);
//     try {
//       await axios.post(`https://test-api-3tmq.onrender.com/ProjVendRt`, {
//         projVendRtKey: 0,
//         projId: selectedPlan?.projId,
//         vendId: newVendorRate.vendorId,
//         vendEmplId: newVendorRate.vendorEmployee,
//         billLabCatCd: newVendorRate.plc,
//         billDiscRt: 0,
//         companyId: "1",
//         billRtAmt: parseFloat(newVendorRate.billRate),
//         startDt: new Date(newVendorRate.startDate).toISOString(),
//         endDt: newVendorRate.endDate
//           ? new Date(newVendorRate.endDate).toISOString()
//           : null,
//         sBillRtTypeCd: newVendorRate.rateType,
//         modifiedBy: "admin",
//         timeStamp: new Date().toISOString(),
//       });
//       setNewVendorRate(null);
//       const fetchResponse = await axios.get(
//         `https://test-api-3tmq.onrender.com/ProjVendRt`
//       );
//       const filteredData = fetchResponse.data.filter((item) =>
//         item.projId.toLowerCase().startsWith(selectedProjectId.toLowerCase())
//       );
//       setVendorBillingRates(
//         filteredData.map((item) => ({
//           id: item.id,
//           lookupType: item.lookupType || "Select",
//           vendorId: item.vendId || "",
//           vendorName: item.vendorName || "",
//           vendorEmployee: item.vendEmplId || "",
//           vendorEmployeeName: item.vendEmplName || "",
//           plc: item.billLabCatCd,
//           plcDescription: item.description || "",
//           billRate: item.billRtAmt,
//           rateType: item.sBillRtTypeCd || "Select",
//           startDate: new Date(item.startDt).toISOString().split("T")[0],
//           endDate: item.endDt
//             ? new Date(item.endDt).toISOString().split("T")[0]
//             : null,
//         }))
//       );
//     } catch (error) {
//       console.error(
//         "Error adding vendor billing rate:",
//         error.response ? error.response.data : error.message
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVendorBillRateChange = (id, value) => {
//     setEditVendorBillRate((prev) => ({
//       ...prev,
//       [id]: value === "" ? "" : parseFloat(value) || 0,
//     }));
//   };

//   const handleUpdateVendor = async (id, updatedData) => {
//     setLoading(true);
//     try {
//       await axios.put(`https://test-api-3tmq.onrender.com/ProjVendRt/${id}`, {
//         id,
//         projId: selectedProjectId,
//         vendId: updatedData.vendorId,
//         vendEmplId: updatedData.vendorEmployee,
//         billLabCatCd: updatedData.plc,
//         billDiscRt: 0,
//         companyId: "1",
//         billRtAmt: parseFloat(updatedData.billRate),
//         startDt: new Date(updatedData.startDate).toISOString(),
//         endDt: updatedData.endDate
//           ? new Date(updatedData.endDate).toISOString()
//           : null,
//         sBillRtTypeCd: updatedData.rateType,
//         modifiedBy: "admin",
//         timeStamp: new Date().toISOString(),
//       });
//       setVendorBillingRates((prev) =>
//         prev.map((rate) =>
//           rate.id === id
//             ? {
//                 ...rate,
//                 lookupType: updatedData.lookupType,
//                 vendorId: updatedData.vendorId,
//                 vendorName: updatedData.vendorName,
//                 vendorEmployee: updatedData.vendorEmployee,
//                 vendorEmployeeName: updatedData.vendorEmployeeName,
//                 plc: updatedData.plc,
//                 plcDescription: plcs.find((plc) => plc.laborCategoryCode === updatedData.plc)?.description || updatedData.plcDescription,
//                 billRate: parseFloat(updatedData.billRate),
//                 rateType: updatedData.rateType,
//                 startDate: updatedData.startDate,
//                 endDate: updatedData.endDate || null,
//               }
//             : rate
//         )
//       );
//       setEditVendorBillRate((prev) => ({
//         ...prev,
//         [id]: updatedData.billRate,
//       }));
//     } catch (error) {
//       console.error("Error updating vendor billing rate:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteVendor = async (id) => {
//     setLoading(true);
//     try {
//       await axios.delete(`https://test-api-3tmq.onrender.com/ProjVendRt/${id}`);
//       setVendorBillingRates((prev) => prev.filter((rate) => rate.id !== id));
//       setEditVendorBillRate((prev) => {
//         const newEditVendorBillRate = { ...prev };
//         delete newEditVendorBillRate[id];
//         return newEditVendorBillRate;
//       });
//     } catch (error) {
//       console.error("Error deleting vendor billing rate:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleNewVendorRateChange = (field, value) => {
//     setNewVendorRate((prev) => ({ ...prev, [field]: value }));
//   };

//   return (
//     <div className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16 text-xs">
//       <div className="mb-4">
//         <h3 className="text-xs font-normal">
//           Project Labor Categories Billing Rates Schedule
//         </h3>
//         <div className="overflow-x-auto">
//           <table className="w-full text-xs border-collapse">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="border p-1 font-normal">Plc</th>
//                 <th className="border p-1 font-normal">Bill Rate</th>
//                 <th className="border p-1 font-normal">Rate Type</th>
//                 <th className="border p-1 font-normal">Start Date</th>
//                 <th className="border p-1 font-normal">End Date</th>
//                 <th className="border p-1 font-normal">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="6" className="border p-1 text-center">
//                     Loading...
//                   </td>
//                 </tr>
//               ) : billingRatesSchedule.length === 0 ? (
//                 <tr>
//                   <td colSpan="6" className="border p-1 text-center">
//                     No data available
//                   </td>
//                 </tr>
//               ) : (
//                 billingRatesSchedule.map((item) => (
//                   <tr
//                     key={item.id}
//                     className="sm:table-row flex flex-col sm:flex-row mb-1 sm:mb-0"
//                   >
//                     <td className="border p-1 sm:w-1/6">
//                       <input
//                         type="text"
//                         value={item.plc}
//                         onChange={(e) => {
//                           handleNewRateChange("plc", e.target.value);
//                           setPlcSearch(e.target.value);
//                         }}
//                         className="w-full p-1 border rounded text-xs"
//                         list="plc-list"
//                       />
//                       <datalist id="plc-list">
//                         {plcs.map((plc) => (
//                           <option
//                             key={plc.laborCategoryCode}
//                             value={plc.laborCategoryCode}
//                           >
//                             {plc.description}
//                           </option>
//                         ))}
//                       </datalist>
//                     </td>
//                     <td className="border p-1 sm:w-1/6">
//                       <input
//                         type="text"
//                         value={editBillRate[item.id] ?? item.billRate}
//                         onChange={(e) =>
//                           handleBillRateChange(item.id, e.target.value)
//                         }
//                         className="w-full p-1 border rounded text-xs"
//                       />
//                     </td>
//                     <td className="border p-1 sm:w-1/6">
//                       <select
//                         value={item.rateType}
//                         onChange={(e) =>
//                           handleNewRateChange("rateType", e.target.value)
//                         }
//                         className="w-full p-1 border rounded text-xs"
//                       >
//                         {rateTypeOptions.map((option) => (
//                           <option key={option} value={option}>
//                             {option}
//                           </option>
//                         ))}
//                       </select>
//                     </td>
//                     <td className="border p-1 sm:w-1/6">
//                       <input
//                         type="date"
//                         value={item.startDate}
//                         onChange={(e) =>
//                           handleNewRateChange("startDate", e.target.value)
//                         }
//                         className="w-full p-1 border rounded text-xs"
//                       />
//                     </td>
//                     <td className="border p-1 sm:w-1/6">
//                       <input
//                         type="date"
//                         value={item.endDate || ""}
//                         onChange={(e) =>
//                           handleNewRateChange("endDate", e.target.value)
//                         }
//                         className="w-full p-1 border rounded text-xs"
//                       />
//                     </td>
//                     <td className="border p-1 sm:w-1/6">
//                       <div className="flex flex-col sm:flex-row justify-center space-y-1 sm:space-y-0 sm:space-x-1">
//                         <button
//                           onClick={() =>
//                             handleUpdate(item.id, {
//                               ...item,
//                               billRate: editBillRate[item.id] || item.billRate,
//                             })
//                           }
//                           className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-yellow-600 transition w-full sm:w-auto"
//                           disabled={loading}
//                         >
//                           Update
//                         </button>
//                         <button
//                           onClick={() => handleDelete(item.id)}
//                           className="bg-red-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-red-600 transition w-full sm:w-auto"
//                           disabled={loading}
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//               {newRate && (
//                 <tr className="sm:table-row flex flex-col sm:flex-row mb-1 sm:mb-0">
//                   <td className="border p-1 sm:w-1/6">
//                     <input
//                       type="text"
//                       value={newRate.plc || ""}
//                       onChange={(e) => {
//                         handleNewRateChange("plc", e.target.value);
//                         setPlcSearch(e.target.value);
//                       }}
//                       className="w-full p-1 border rounded text-xs"
//                       list="plc-list"
//                     />
//                     <datalist id="plc-list">
//                       {plcs.map((plc) => (
//                         <option
//                           key={plc.laborCategoryCode}
//                           value={plc.laborCategoryCode}
//                         >
//                           {plc.description}
//                         </option>
//                       ))}
//                     </datalist>
//                   </td>
//                   <td className="border p-1 sm:w-1/6">
//                     <input
//                       type="text"
//                       value={newRate.billRate || ""}
//                       onChange={(e) =>
//                         handleNewRateChange("billRate", e.target.value)
//                       }
//                       className="w-full p-1 border rounded text-xs"
//                     />
//                   </td>
//                   <td className="border p-1 sm:w-1/6">
//                     <select
//                       value={newRate.rateType}
//                       onChange={(e) =>
//                         handleNewRateChange("rateType", e.target.value)
//                       }
//                       className="w-full p-1 border rounded text-xs"
//                     >
//                       {rateTypeOptions.map((option) => (
//                         <option key={option} value={option}>
//                           {option}
//                         </option>
//                       ))}
//                     </select>
//                   </td>
//                   <td className="border p-1 sm:w-1/6">
//                     <input
//                       type="date"
//                       value={newRate.startDate || ""}
//                       onChange={(e) =>
//                         handleNewRateChange("startDate", e.target.value)
//                       }
//                       className="w-full p-1 border rounded text-xs"
//                     />
//                   </td>
//                   <td className="border p-1 sm:w-1/6">
//                     <input
//                       type="date"
//                       value={newRate.endDate || ""}
//                       onChange={(e) =>
//                         handleNewRateChange("endDate", e.target.value)
//                       }
//                       className="w-full p-1 border rounded text-xs"
//                     />
//                   </td>
//                   <td className="border p-1 sm:w-1/6">
//                     <div className="flex flex-col sm:flex-row justify-center space-y-1 sm:space-y-0 sm:space-x-1">
//                       <button
//                         onClick={handleSaveNewRate}
//                         className="bg-green-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-green-600 transition w-full sm:w-auto"
//                         disabled={loading}
//                       >
//                         Save
//                       </button>
//                       <button
//                         onClick={() => setNewRate(null)}
//                         className="bg-gray-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-gray-600 transition w-full sm:w-auto"
//                         disabled={loading}
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               )}
//               <tr>
//                 <td colSpan="6" className="border p-1">
//                   <button
//                     onClick={handleAddRow}
//                     className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-blue-600 transition"
//                     disabled={loading || newRate}
//                   >
//                     Add
//                   </button>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <div className="mb-4">
//         <h3 className="text-xs font-normal">Employee Billing Rates Schedule</h3>
//         <div className="overflow-x-auto">
//           <table className="w-full text-xs border-collapse">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="border p-1 font-normal">Lookup Type</th>
//                 <th className="border p-1 font-normal">Employee</th>
//                 <th className="border p-1 font-normal">Employee Name</th>
//                 <th className="border p-1 font-normal">PLC</th>
//                 <th className="border p-1 font-normal">PLC Description</th>
//                 <th className="border p-1 font-normal">Bill Rate</th>
//                 <th className="border p-1 font-normal">Rate Type</th>
//                 <th className="border p-1 font-normal">Start Date</th>
//                 <th className="border p-1 font-normal">End Date</th>
//                 <th className="border p-1 font-normal">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="10" className="border p-1 text-center">
//                     Loading...
//                   </td>
//                 </tr>
//               ) : employeeBillingRates.length === 0 && !newEmployeeRate ? (
//                 <tr>
//                   <td colSpan="10" className="border p-1 text-center">
//                     No data available
//                   </td>
//                 </tr>
//               ) : (
//                 employeeBillingRates.map((item) => (
//                   <tr
//                     key={item.id}
//                     className="sm:table-row flex flex-col sm:flex-row mb-1 sm:mb-0"
//                   >
//                     <td className="border p-1 sm:w-1/10">
//                       <select
//                         value={(editEmployeeFields[item.id]?.lookupType) ?? item.lookupType}
//                         onChange={(e) =>
//                           handleNewEmployeeRateChange(
//                             "lookupType",
//                             e.target.value,
//                             item.id
//                           )
//                         }
//                         className="w-full p-1 border rounded text-xs"
//                       >
//                         {lookupTypeOptions.map((option) => (
//                           <option key={option} value={option}>
//                             {option}
//                           </option>
//                         ))}
//                       </select>
//                     </td>
//                     <td className="border p-1 sm:w-1/10">
//                       <input
//                         type="text"
//                         value={item.empId}
//                         onChange={(e) =>
//                           handleNewEmployeeRateChange(
//                             "empId",
//                             e.target.value,
//                             item.id
//                           )
//                         }
//                         className="w-full p-1 border rounded text-xs"
//                         list="employee-list"
//                         disabled={employees.length === 0}
//                       />
//                       <datalist id="employee-list">
//                         {employees.map((emp) => (
//                           <option key={emp.empId} value={emp.empId}>
//                             {emp.employeeName}
//                           </option>
//                         ))}
//                       </datalist>
//                     </td>
//                     <td className="border p-1 sm:w-1/10">
//                       {item.employeeName}
//                     </td>
//                     <td className="border p-1 sm:w-1/10">
//                       <input
//                         type="text"
//                         value={item.plc}
//                         onChange={(e) => {
//                           handleNewEmployeeRateChange(
//                             "plc",
//                             e.target.value,
//                             item.id
//                           );
//                           setPlcSearch(e.target.value);
//                         }}
//                         className="w-full p-1 border rounded text-xs"
//                         list="plc-list"
//                         disabled
//                       />
//                       <datalist id="plc-list">
//                         {plcs.map((plc) => (
//                           <option
//                             key={plc.laborCategoryCode}
//                             value={plc.laborCategoryCode}
//                           >
//                             {plc.description}
//                           </option>
//                         ))}
//                       </datalist>
//                     </td>
//                     <td className="border p-1 sm:w-1/10">
//                       {plcs.find((plc) => plc.laborCategoryCode === item.plc)
//                         ?.description || item.plcDescription}
//                     </td>
//                     <td className="border p-1 sm:w-1/10">
//                       <input
//                         type="text"
//                         value={editEmployeeBillRate[item.id] ?? item.billRate}
//                         onChange={(e) =>
//                           handleEmployeeBillRateChange(item.id, e.target.value)
//                         }
//                         className="w-full p-1 border rounded text-xs"
//                       />
//                     </td>
//                     <td className="border p-1 sm:w-1/10">
//                       <select
//                         value={(editEmployeeFields[item.id]?.rateType) ?? item.rateType}
//                         onChange={(e) =>
//                           handleNewEmployeeRateChange(
//                             "rateType",
//                             e.target.value,
//                             item.id
//                           )
//                         }
//                         className="w-full p-1 border rounded text-xs"
//                       >
//                         {rateTypeOptions.map((option) => (
//                           <option key={option} value={option}>
//                             {option}
//                           </option>
//                         ))}
//                       </select>
//                     </td>
//                     <td className="border p-1 sm:w-1/10">
//                       <input
//                         type="date"
//                         value={(editEmployeeFields[item.id]?.startDate) ?? item.startDate}
//                         onChange={(e) =>
//                           handleNewEmployeeRateChange(
//                             "startDate",
//                             e.target.value,
//                             item.id
//                           )
//                         }
//                         className="w-full p-1 border rounded text-xs"
//                       />
//                     </td>
//                     <td className="border p-1 sm:w-1/10">
//                       <input
//                         type="date"
//                         value={(editEmployeeFields[item.id]?.endDate) ?? item.endDate ?? ""}
//                         onChange={(e) =>
//                           handleNewEmployeeRateChange(
//                             "endDate",
//                             e.target.value,
//                             item.id
//                           )
//                         }
//                         className="w-full p-1 border rounded text-xs"
//                       />
//                     </td>
//                     <td className="border p-1 sm:w-1/10">
//                       <div className="flex flex-col sm:flex-row justify-center space-y-1 sm:space-y-0 sm:space-x-1">
//                         <button
//                           onClick={() =>
//                             handleUpdateEmployee(item.id, {
//                               ...item,
//                               billRate:
//                                 editEmployeeBillRate[item.id] || item.billRate,
//                             })
//                           }
//                           className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-yellow-600 transition w-full sm:w-auto"
//                           disabled={loading || !item.id}
//                         >
//                           Update
//                         </button>
//                         <button
//                           onClick={() => handleDeleteEmployee(item.id)}
//                           className="bg-red-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-red-600 transition w-full sm:w-auto"
//                           disabled={loading || !item.id}
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//               {newEmployeeRate && (
//                 <tr className="sm:table-row flex flex-col sm:flex-row mb-1 sm:mb-0">
//                   <td className="border p-1 sm:w-1/10">
//                     <select
//                       value={newEmployeeRate.lookupType}
//                       onChange={(e) =>
//                         handleNewEmployeeRateChange(
//                           "lookupType",
//                           e.target.value
//                         )
//                       }
//                       className="w-full p-1 border rounded text-xs"
//                     >
//                       {lookupTypeOptions.map((option) => (
//                         <option key={option} value={option}>
//                           {option}
//                         </option>
//                       ))}
//                     </select>
//                   </td>
//                   <td className="border p-1 sm:w-1/10">
//                     <input
//                       type="text"
//                       value={newEmployeeRate.empId || ""}
//                       onChange={(e) =>
//                         handleNewEmployeeRateChange("empId", e.target.value)
//                       }
//                       className="w-full p-1 border rounded text-xs"
//                       list="employee-list"
//                       disabled={employees.length === 0}
//                     />
//                     <datalist id="employee-list">
//                       {employees.map((emp) => (
//                         <option key={emp.empId} value={emp.empId}>
//                           {emp.employeeName}
//                         </option>
//                       ))}
//                     </datalist>
//                   </td>
//                   <td className="border p-1 sm:w-1/10">
//                     {newEmployeeRate.employeeName || ""}
//                   </td>
//                   <td className="border p-1 sm:w-1/10">
//                     <input
//                       type="text"
//                       value={newEmployeeRate.plc || ""}
//                       onChange={(e) => {
//                         handleNewEmployeeRateChange("plc", e.target.value);
//                         setPlcSearch(e.target.value);
//                       }}
//                       className="w-full p-1 border rounded text-xs"
//                       list="plc-list"
//                     />
//                     <datalist id="plc-list">
//                       {plcs.map((plc) => (
//                         <option
//                           key={plc.laborCategoryCode}
//                           value={plc.laborCategoryCode}
//                         >
//                           {plc.description}
//                         </option>
//                       ))}
//                     </datalist>
//                   </td>
//                   <td className="border p-1 sm:w-1/10">
//                     {plcs.find(
//                       (plc) => plc.laborCategoryCode === newEmployeeRate.plc
//                     )?.description || ""}
//                   </td>
//                   <td className="border p-1 sm:w-1/10">
//                     <input
//                       type="text"
//                       value={newEmployeeRate.billRate || ""}
//                       onChange={(e) =>
//                         handleNewEmployeeRateChange("billRate", e.target.value)
//                       }
//                       className="w-full p-1 border rounded text-xs"
//                     />
//                   </td>
//                   <td className="border p-1 sm:w-1/10">
//                     <select
//                       value={newEmployeeRate.rateType}
//                       onChange={(e) =>
//                         handleNewEmployeeRateChange("rateType", e.target.value)
//                       }
//                       className="w-full p-1 border rounded text-xs"
//                     >
//                       {rateTypeOptions.map((option) => (
//                         <option key={option} value={option}>
//                           {option}
//                         </option>
//                       ))}
//                     </select>
//                   </td>
//                   <td className="border p-1 sm:w-1/10">
//                     <input
//                       type="date"
//                       value={newEmployeeRate.startDate || ""}
//                       onChange={(e) =>
//                         handleNewEmployeeRateChange("startDate", e.target.value)
//                       }
//                       className="w-full p-1 border rounded text-xs"
//                     />
//                   </td>
//                   <td className="border p-1 sm:w-1/10">
//                     <input
//                       type="date"
//                       value={newEmployeeRate.endDate || ""}
//                       onChange={(e) =>
//                         handleNewEmployeeRateChange("endDate", e.target.value)
//                       }
//                       className="w-full p-1 border rounded text-xs"
//                     />
//                   </td>
//                   <td className="border p-1 sm:w-1/10">
//                     <div className="flex flex-col sm:flex-row justify-center space-y-1 sm:space-y-0 sm:space-x-1">
//                       <button
//                         onClick={handleSaveNewEmployeeRate}
//                         className="bg-green-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-green-600 transition w-full sm:w-auto"
//                         disabled={loading}
//                       >
//                         Save
//                       </button>
//                       <button
//                         onClick={() => setNewEmployeeRate(null)}
//                         className="bg-gray-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-gray-600 transition w-full sm:w-auto"
//                         disabled={loading}
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               )}
//               <tr>
//                 <td colSpan="10" className="border p-1">
//                   <button
//                     onClick={handleAddEmployeeRow}
//                     className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-blue-600 transition"
//                     disabled={loading || newEmployeeRate}
//                   >
//                     Add
//                   </button>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <div className="mb-4">
//         <h3 className="text-xs font-normal">Vendor Billing Rates Schedule</h3>
//         <div className="overflow-x-auto">
//           <table className="w-full text-xs border-collapse">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="border p-1 font-normal">Lookup Type</th>
//                 <th className="border p-1 font-normal">Vendor</th>
//                 <th className="border p-1 font-normal">Vendor Name</th>
//                 <th className="border p-1 font-normal">Vendor Employee</th>
//                 <th className="border p-1 font-normal">Vendor Employee Name</th>
//                 <th className="border p-1 font-normal">PLC</th>
//                 <th className="border p-1 font-normal">PLC Description</th>
//                 <th className="border p-1 font-normal">Bill Rate</th>
//                 <th className="border p-1 font-normal">Rate Type</th>
//                 <th className="border p-1 font-normal">Start Date</th>
//                 <th className="border p-1 font-normal">End Date</th>
//                 <th className="border p-1 font-normal">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="12" className="border p-1 text-center">
//                     Loading...
//                   </td>
//                 </tr>
//               ) : vendorBillingRates.length === 0 ? (
//                 <tr>
//                   <td colSpan="12" className="border p-1 text-center">
//                     No data available
//                   </td>
//                 </tr>
//               ) : (
//                 vendorBillingRates.map((item) => (
//                   <tr
//                     key={item.id}
//                     className="sm:table-row flex flex-col sm:flex-row mb-1 sm:mb-0"
//                   >
//                     <td className="border p-1 sm:w-1/12">
//                       <select
//                         value={item.lookupType}
//                         onChange={(e) =>
//                           setVendorBillingRates((prev) =>
//                             prev.map((rate) =>
//                               rate.id === item.id
//                                 ? { ...rate, lookupType: e.target.value }
//                                 : rate
//                             )
//                           )
//                         }
//                         className="w-full p-1 border rounded text-xs"
//                       >
//                         {lookupTypeOptions.map((option) => (
//                           <option key={option} value={option}>
//                             {option}
//                           </option>
//                         ))}
//                       </select>
//                     </td>
//                     <td className="border p-1 sm:w-1/12">
//                       <input
//                         type="text"
//                         value={item.vendorId}
//                         onChange={(e) =>
//                           setVendorBillingRates((prev) =>
//                             prev.map((rate) =>
//                               rate.id === item.id
//                                 ? { ...rate, vendorId: e.target.value }
//                                 : rate
//                             )
//                           )
//                         }
//                         className="w-full p-1 border rounded text-xs"
//                       />
//                     </td>
//                     <td className="border p-1 sm:w-1/12">
//                       <input
//                         type="text"
//                         value={item.vendorName}
//                         onChange={(e) =>
//                           setVendorBillingRates((prev) =>
//                             prev.map((rate) =>
//                               rate.id === item.id
//                                 ? { ...rate, vendorName: e.target.value }
//                                 : rate
//                             )
//                           )
//                         }
//                         className="w-full p-1 border rounded text-xs"
//                       />
//                     </td>
//                     <td className="border p-1 sm:w-1/12">
//                       <input
//                         type="text"
//                         value={item.vendorEmployee}
//                         onChange={(e) =>
//                           setVendorBillingRates((prev) =>
//                             prev.map((rate) =>
//                               rate.id === item.id
//                                 ? { ...rate, vendorEmployee: e.target.value }
//                                 : rate
//                             )
//                           )
//                         }
//                         className="w-full p-1 border rounded text-xs"
//                       />
//                     </td>
//                     <td className="border p-1 sm:w-1/12">
//                       <input
//                         type="text"
//                         value={item.vendorEmployeeName}
//                         onChange={(e) =>
//                           setVendorBillingRates((prev) =>
//                             prev.map((rate) =>
//                               rate.id === item.id
//                                 ? {
//                                     ...rate,
//                                     vendorEmployeeName: e.target.value,
//                                   }
//                                 : rate
//                             )
//                           )
//                         }
//                         className="w-full p-1 border rounded text-xs"
//                       />
//                     </td>
//                     <td className="border p-1 sm:w-1/12">
//                       <input
//                         type="text"
//                         value={item.plc}
//                         onChange={(e) => {
//                           setVendorBillingRates((prev) =>
//                             prev.map((rate) =>
//                               rate.id === item.id
//                                 ? { ...rate, plc: e.target.value }
//                                 : rate
//                             )
//                           );
//                           setPlcSearch(e.target.value);
//                         }}
//                         className="w-full p-1 border rounded text-xs"
//                         list="plc-list"
//                       />
//                       <datalist id="plc-list">
//                         {plcs.map((plc) => (
//                           <option
//                             key={plc.laborCategoryCode}
//                             value={plc.laborCategoryCode}
//                           >
//                             {plc.description}
//                           </option>
//                         ))}
//                       </datalist>
//                     </td>
//                     <td className="border p-1 sm:w-1/12">
//                       {plcs.find((plc) => plc.laborCategoryCode === item.plc)
//                         ?.description || item.plcDescription}
//                     </td>
//                     <td className="border p-1 sm:w-1/12">
//                       <input
//                         type="text"
//                         value={editVendorBillRate[item.id] ?? item.billRate}
//                         onChange={(e) =>
//                           handleVendorBillRateChange(item.id, e.target.value)
//                         }
//                         className="w-full p-1 border rounded text-xs"
//                       />
//                     </td>
//                     <td className="border p-1 sm:w-1/12">
//                       <select
//                         value={item.rateType}
//                         onChange={(e) =>
//                           setVendorBillingRates((prev) =>
//                             prev.map((rate) =>
//                               rate.id === item.id
//                                 ? { ...rate, rateType: e.target.value }
//                                 : rate
//                             )
//                           )
//                         }
//                         className="w-full p-1 border rounded text-xs"
//                       >
//                         {rateTypeOptions.map((option) => (
//                           <option key={option} value={option}>
//                             {option}
//                           </option>
//                         ))}
//                       </select>
//                     </td>
//                     <td className="border p-1 sm:w-1/12">
//                       <input
//                         type="date"
//                         value={item.startDate}
//                         onChange={(e) =>
//                           setVendorBillingRates((prev) =>
//                             prev.map((rate) =>
//                               rate.id === item.id
//                                 ? { ...rate, startDate: e.target.value }
//                                 : rate
//                             )
//                           )
//                         }
//                         className="w-full p-1 border rounded text-xs"
//                       />
//                     </td>
//                     <td className="border p-1 sm:w-1/12">
//                       <input
//                         type="date"
//                         value={item.endDate || ""}
//                         onChange={(e) =>
//                           setVendorBillingRates((prev) =>
//                             prev.map((rate) =>
//                               rate.id === item.id
//                                 ? { ...rate, endDate: e.target.value }
//                                 : rate
//                             )
//                           )
//                         }
//                         className="w-full p-1 border rounded text-xs"
//                       />
//                     </td>
//                     <td className="border p-1 sm:w-1/12">
//                       <div className="flex flex-col sm:flex-row justify-center space-y-1 sm:space-y-0 sm:space-x-1">
//                         <button
//                           onClick={() =>
//                             handleUpdateVendor(item.id, {
//                               ...item,
//                               billRate:
//                                 editVendorBillRate[item.id] || item.billRate,
//                             })
//                           }
//                           className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-yellow-600 transition w-full sm:w-auto"
//                           disabled={loading}
//                         >
//                           Update
//                         </button>
//                         <button
//                           onClick={() => handleDeleteVendor(item.id)}
//                           className="bg-red-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-red-600 transition w-full sm:w-auto"
//                           disabled={loading}
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//               {newVendorRate && (
//                 <tr className="sm:table-row flex flex-col sm:flex-row mb-1 sm:mb-0">
//                   <td className="border p-1 sm:w-1/12">
//                     <select
//                       value={newVendorRate.lookupType}
//                       onChange={(e) =>
//                         handleNewVendorRateChange("lookupType", e.target.value)
//                       }
//                       className="w-full p-1 border rounded text-xs"
//                     >
//                       {lookupTypeOptions.map((option) => (
//                         <option key={option} value={option}>
//                           {option}
//                         </option>
//                       ))}
//                     </select>
//                   </td>
//                   <td className="border p-1 sm:w-1/12">
//                     <input
//                       type="text"
//                       value={newVendorRate.vendorId || ""}
//                       onChange={(e) =>
//                         handleNewVendorRateChange("vendorId", e.target.value)
//                       }
//                       className="w-full p-1 border rounded text-xs"
//                     />
//                   </td>
//                   <td className="border p-1 sm:w-1/12">
//                     <input
//                       type="text"
//                       value={newVendorRate.vendorName || ""}
//                       onChange={(e) =>
//                         handleNewVendorRateChange("vendorName", e.target.value)
//                       }
//                       className="w-full p-1 border rounded text-xs"
//                     />
//                   </td>
//                   <td className="border p-1 sm:w-1/12">
//                     <input
//                       type="text"
//                       value={newVendorRate.vendorEmployee || ""}
//                       onChange={(e) =>
//                         handleNewVendorRateChange(
//                           "vendorEmployee",
//                           e.target.value
//                         )
//                       }
//                       className="w-full p-1 border rounded text-xs"
//                     />
//                   </td>
//                   <td className="border p-1 sm:w-1/12">
//                     <input
//                       type="text"
//                       value={newVendorRate.vendorEmployeeName || ""}
//                       onChange={(e) =>
//                         handleNewVendorRateChange(
//                           "vendorEmployeeName",
//                           e.target.value
//                         )
//                       }
//                       className="w-full p-1 border rounded text-xs"
//                     />
//                   </td>
//                   <td className="border p-1 sm:w-1/12">
//                     <input
//                       type="text"
//                       value={newVendorRate.plc || ""}
//                       onChange={(e) => {
//                         handleNewVendorRateChange("plc", e.target.value);
//                         setPlcSearch(e.target.value);
//                       }}
//                       className="w-full p-1 border rounded text-xs"
//                       list="plc-list"
//                     />
//                     <datalist id="plc-list">
//                       {plcs.map((plc) => (
//                         <option
//                           key={plc.laborCategoryCode}
//                           value={plc.laborCategoryCode}
//                         >
//                           {plc.description}
//                         </option>
//                       ))}
//                     </datalist>
//                   </td>
//                   <td className="border p-1 sm:w-1/12">
//                     {plcs.find(
//                       (plc) => plc.laborCategoryCode === newVendorRate.plc
//                     )?.description || ""}
//                   </td>
//                   <td className="border p-1 sm:w-1/12">
//                     <input
//                       type="text"
//                       value={newVendorRate.billRate || ""}
//                       onChange={(e) =>
//                         handleNewVendorRateChange("billRate", e.target.value)
//                       }
//                       className="w-full p-1 border rounded text-xs"
//                     />
//                   </td>
//                   <td className="border p-1 sm:w-1/12">
//                     <select
//                       value={newVendorRate.rateType}
//                       onChange={(e) =>
//                         handleNewVendorRateChange("rateType", e.target.value)
//                       }
//                       className="w-full p-1 border rounded text-xs"
//                     >
//                       {rateTypeOptions.map((option) => (
//                         <option key={option} value={option}>
//                           {option}
//                         </option>
//                       ))}
//                     </select>
//                   </td>
//                   <td className="border p-1 sm:w-1/12">
//                     <input
//                       type="date"
//                       value={newVendorRate.startDate || ""}
//                       onChange={(e) =>
//                         handleNewVendorRateChange("startDate", e.target.value)
//                       }
//                       className="w-full p-1 border rounded text-xs"
//                     />
//                   </td>
//                   <td className="border p-1 sm:w-1/12">
//                     <input
//                       type="date"
//                       value={newVendorRate.endDate || ""}
//                       onChange={(e) =>
//                         handleNewVendorRateChange("endDate", e.target.value)
//                       }
//                       className="w-full p-1 border rounded text-xs"
//                     />
//                   </td>
//                   <td className="border p-1 sm:w-1/12">
//                     <div className="flex flex-col sm:flex-row justify-center space-y-1 sm:space-y-0 sm:space-x-1">
//                       <button
//                         onClick={handleSaveNewVendorRate}
//                         className="bg-green-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-green-600 transition w-full sm:w-auto"
//                         disabled={loading}
//                       >
//                         Save
//                       </button>
//                       <button
//                         onClick={() => setNewVendorRate(null)}
//                         className="bg-gray-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-gray-600 transition w-full sm:w-auto"
//                         disabled={loading}
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               )}
//               <tr>
//                 <td colSpan="12" className="border p-1">
//                   <button
//                     onClick={handleAddVendorRow}
//                     className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-blue-600 transition"
//                     disabled={loading || newVendorRate}
//                   >
//                     Add
//                   </button>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PLCComponent;

import React, { useState, useEffect } from "react";
import axios from "axios";

const PLCComponent = ({ selectedProjectId, selectedPlan }) => {
  const [billingRatesSchedule, setBillingRatesSchedule] = useState([]);
  const [newRate, setNewRate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editBillRate, setEditBillRate] = useState({});
  const [employees, setEmployees] = useState([]);
  const [employeeBillingRates, setEmployeeBillingRates] = useState([]);
  const [newEmployeeRate, setNewEmployeeRate] = useState(null);
  const [editEmployeeBillRate, setEditEmployeeBillRate] = useState({});
  const [editEmployeeFields, setEditEmployeeFields] = useState({});
  const [vendorBillingRates, setVendorBillingRates] = useState([]);
  const [newVendorRate, setNewVendorRate] = useState(null);
  const [editVendorBillRate, setEditVendorBillRate] = useState({});
  const [plcs, setPlcs] = useState([]);
  const [plcSearch, setPlcSearch] = useState("");

  const lookupTypeOptions = ["Select", "Employee", "Contract Vendor"];
  const rateTypeOptions = ["Select", "Billing", "Actual"];

  // Fetch billing rates schedule based on selected project ID
  useEffect(() => {
    const fetchBillingRates = async () => {
      if (!selectedProjectId) return;
      setLoading(true);
      try {
        const response = await axios.get(
          `https://test-api-3tmq.onrender.com/api/ProjectPlcRates`
        );
        const filteredData = response.data.filter((item) =>
          item.projId.toLowerCase().startsWith(selectedProjectId.toLowerCase())
        );
        setBillingRatesSchedule(
          filteredData.map((item) => ({
            id: item.id,
            plc: item.laborCategoryCode,
            billRate: item.billingRate,
            rateType: item.rateType || "Select",
            startDate: item.effectiveDate
              ? item.effectiveDate.split("T")[0]
              : "",
            endDate: item.endDate ? item.endDate.split("T")[0] : null,
          }))
        );
        const newEditBillRate = {};
        filteredData.forEach((item) => {
          newEditBillRate[item.id] = item.billingRate;
        });
        setEditBillRate(newEditBillRate);
      } catch (error) {
        console.error("Error fetching billing rates:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBillingRates();
  }, [selectedProjectId]);

  // Fetch employees for the selected project
  useEffect(() => {
    const fetchEmployees = async () => {
      if (
        !selectedProjectId ||
        typeof selectedProjectId !== "string" ||
        selectedProjectId.trim() === ""
      ) {
        setEmployees([]);
        return;
      }
      setLoading(true);
      try {
        const response = await axios.get(
          `https://test-api-3tmq.onrender.com/Project/GetEmployeesByProject/${selectedProjectId}`
        );
        setEmployees(
          response.data.map((item) => ({
            empId: item.empId,
            employeeName: item.employeeName,
          }))
        );
      } catch (error) {
        console.error("Error fetching employees:", error);
        setEmployees([]);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, [selectedProjectId]);

  // Fetch PLCs for search
  useEffect(() => {
    const fetchPlcs = async () => {
      if (!plcSearch) return;
      try {
        const response = await axios.get(
          `https://test-api-3tmq.onrender.com/Project/GetAllPlcs/${plcSearch}`
        );
        const filteredPlcs = response.data
          .filter((item) =>
            item.laborCategoryCode
              .toLowerCase()
              .includes(plcSearch.toLowerCase())
          )
          .map((item) => ({
            laborCategoryCode: item.laborCategoryCode,
            description: item.description || "",
          }));
        setPlcs(filteredPlcs);
      } catch (error) {
        console.error("Error fetching PLCs:", error);
      }
    };
    fetchPlcs();
  }, [plcSearch]);

  // Fetch employee billing rates
  useEffect(() => {
    const fetchEmployeeBillingRates = async () => {
      if (!selectedProjectId) return;
      setLoading(true);
      try {
        const response = await axios.get(
          `https://test-api-3tmq.onrender.com/ProjEmplRt`
        );
        const filteredData = response.data.filter(
          (item) =>
            item.projId
              .toLowerCase()
              .startsWith(selectedProjectId.toLowerCase()) && item.emplId
        );
        setEmployeeBillingRates(
          filteredData.map((item) => ({
            id: item.projEmplRtKey || item.id,
            lookupType: item.lookupType || "Select",
            empId: item.emplId,
            employeeName:
              item.employeeName ||
              employees.find((emp) => emp.empId === item.emplId)
                ?.employeeName ||
              "",
            plc: item.billLabCatCd,
            plcDescription: item.plcDescription || "",
            billRate: item.billRtAmt,
            rateType: item.sBillRtTypeCd || "Select",
            startDate: item.startDt ? item.startDt.split("T")[0] : "",
            endDate: item.endDt ? item.endDt.split("T")[0] : null,
          }))
        );
        const newEditEmployeeBillRate = {};
        const newEditEmployeeFields = {};
        filteredData.forEach((item) => {
          const id = item.projEmplRtKey || item.id;
          if (id) {
            newEditEmployeeBillRate[id] = item.billRtAmt;
            newEditEmployeeFields[id] = {
              lookupType: item.lookupType || "Select",
              rateType: item.sBillRtTypeCd || "Select",
              startDate: item.startDt ? item.startDt.split("T")[0] : "",
              endDate: item.endDt ? item.endDt.split("T")[0] : null,
            };
          }
        });
        setEditEmployeeBillRate(newEditEmployeeBillRate);
        setEditEmployeeFields(newEditEmployeeFields);
      } catch (error) {
        console.error("Error fetching employee billing rates:", error);
        setEmployeeBillingRates([]);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployeeBillingRates();
  }, [selectedProjectId, employees]);

  // Fetch vendor billing rates
  useEffect(() => {
    const fetchVendorBillingRates = async () => {
      if (!selectedProjectId) return;
      setLoading(true);
      try {
        const response = await axios.get(
          `https://test-api-3tmq.onrender.com/ProjVendRt`
        );
        const filteredData = response.data.filter((item) =>
          item.projId.toLowerCase().startsWith(selectedProjectId.toLowerCase())
        );
        setVendorBillingRates(
          filteredData.map((item) => ({
            id: item.id,
            lookupType: item.lookupType || "Select",
            vendorId: item.vendId || "",
            vendorName: item.vendorName || "",
            vendorEmployee: item.vendEmplId || "",
            vendorEmployeeName: item.vendEmplName || "",
            plc: item.billLabCatCd,
            plcDescription: item.description || "",
            billRate: item.billRtAmt,
            rateType: item.sBillRtTypeCd || "Select",
            startDate: new Date(item.startDt).toISOString().split("T")[0],
            endDate: item.endDt
              ? new Date(item.endDt).toISOString().split("T")[0]
              : null,
          }))
        );
        const newEditVendorBillRate = {};
        filteredData.forEach((item) => {
          newEditVendorBillRate[item.id] = item.billRtAmt;
        });
        setEditVendorBillRate(newEditVendorBillRate);
      } catch (error) {
        console.error("Error fetching vendor billing rates:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVendorBillingRates();
  }, [selectedProjectId]);

  const handleUpdate = async (id, updatedData) => {
    setLoading(true);
    try {
      await axios.put(
        `https://test-api-3tmq.onrender.com/api/ProjectPlcRates/${id}`,
        {
          id,
          projId: selectedProjectId,
          laborCategoryCode: updatedData.plc,
          costRate: parseFloat(updatedData.billRate) * 0.65,
          billingRate: parseFloat(updatedData.billRate),
          effectiveDate: updatedData.startDate,
          endDate: updatedData.endDate || null,
          rateType: updatedData.rateType,
          isActive: true,
          modifiedBy: "admin",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      );
      setBillingRatesSchedule((prev) =>
        prev.map((rate) =>
          rate.id === id
            ? {
                ...rate,
                plc: updatedData.plc,
                billRate: parseFloat(updatedData.billRate),
                rateType: updatedData.rateType,
                startDate: updatedData.startDate,
                endDate: updatedData.endDate || null,
              }
            : rate
        )
      );
      setEditBillRate((prev) => ({ ...prev, [id]: updatedData.billRate }));
    } catch (error) {
      console.error("Error updating billing rate:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(
        `https://test-api-3tmq.onrender.com/api/ProjectPlcRates/${id}`
      );
      setBillingRatesSchedule((prev) => prev.filter((rate) => rate.id !== id));
      setEditBillRate((prev) => {
        const newEditBillRate = { ...prev };
        delete newEditBillRate[id];
        return newEditBillRate;
      });
    } catch (error) {
      console.error("Error deleting billing rate:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRow = () => {
    setNewRate({
      plc: "",
      billRate: "",
      rateType: "Select",
      startDate: "",
      endDate: "",
    });
  };

  const handleSaveNewRate = async () => {
    if (!newRate || !newRate.plc || !newRate.startDate || !newRate.billRate) {
      console.error(
        "Please fill all required fields (PLC, Bill Rate, Start Date)"
      );
      return;
    }
    setLoading(true);
    try {
      await axios.post(
        `https://test-api-3tmq.onrender.com/api/ProjectPlcRates`,
        {
          id: 0,
          projId: selectedProjectId,
          laborCategoryCode: newRate.plc,
          costRate: parseFloat(newRate.billRate) * 0.65,
          billingRate: parseFloat(newRate.billRate),
          effectiveDate: newRate.startDate,
          endDate: newRate.endDate || null,
          rateType: newRate.rateType,
          isActive: true,
          modifiedBy: "admin",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      );
      setNewRate(null);
      const fetchResponse = await axios.get(
        `https://test-api-3tmq.onrender.com/api/ProjectPlcRates`
      );
      const filteredData = fetchResponse.data.filter((item) =>
        item.projId.toLowerCase().startsWith(selectedProjectId.toLowerCase())
      );
      setBillingRatesSchedule(
        filteredData.map((item) => ({
          id: item.id,
          plc: item.laborCategoryCode,
          billRate: item.billingRate,
          rateType: item.rateType || "Select",
          startDate: item.effectiveDate ? item.effectiveDate.split("T")[0] : "",
          endDate: item.endDate ? item.endDate.split("T")[0] : null,
        }))
      );
    } catch (error) {
      console.error(
        "Error adding billing rate:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handleNewRateChange = (field, value) => {
    setNewRate((prev) => ({ ...prev, [field]: value }));
  };

  const handleBillRateChange = (id, value) => {
    setEditBillRate((prev) => ({
      ...prev,
      [id]: value === "" ? "" : parseFloat(value) || 0,
    }));
  };

  // Employee Billing Rates Handlers
  const handleAddEmployeeRow = () => {
    setNewEmployeeRate({
      lookupType: "Select",
      empId: "",
      employeeName: "",
      plc: "",
      billRate: "",
      rateType: "Select",
      startDate: "",
      endDate: "",
    });
  };

  const handleSaveNewEmployeeRate = async () => {
    if (
      !newEmployeeRate ||
      !newEmployeeRate.empId ||
      !newEmployeeRate.plc ||
      !newEmployeeRate.startDate ||
      !newEmployeeRate.billRate
    ) {
      console.error(
        "Please fill all required fields (Employee, PLC, Bill Rate, Start Date)"
      );
      return;
    }
    setLoading(true);
    try {
      await axios.post(`https://test-api-3tmq.onrender.com/ProjEmplRt`, {
        id: 0,
        projId: selectedProjectId,
        emplId: newEmployeeRate.empId,
        employeeName: newEmployeeRate.employeeName,
        billLabCatCd: newEmployeeRate.plc,
        billRtAmt: parseFloat(newEmployeeRate.billRate),
        startDt: newEmployeeRate.startDate,
        endDt: newEmployeeRate.endDate || null,
        sBillRtTypeCd: newEmployeeRate.rateType,
        lookupType: newEmployeeRate.lookupType,
        isActive: true,
        modifiedBy: "admin",
      });
      setNewEmployeeRate(null);
      const fetchResponse = await axios.get(
        `https://test-api-3tmq.onrender.com/ProjEmplRt`
      );
      const filteredData = fetchResponse.data.filter(
        (item) =>
          item.projId
            .toLowerCase()
            .startsWith(selectedProjectId.toLowerCase()) && item.emplId
      );
      setEmployeeBillingRates(
        filteredData.map((item) => ({
          id: item.projEmplRtKey || item.id,
          lookupType: item.lookupType || "Select",
          empId: item.emplId,
          employeeName:
            item.employeeName ||
            employees.find((emp) => emp.empId === item.emplId)?.employeeName ||
            "",
          plc: item.billLabCatCd,
          plcDescription: item.plcDescription || "",
          billRate: item.billRtAmt,
          rateType: item.sBillRtTypeCd || "Select",
          startDate: item.startDt ? item.startDt.split("T")[0] : "",
          endDate: item.endDt ? item.endDt.split("T")[0] : null,
        }))
      );
      const newEditEmployeeBillRate = {};
      const newEditEmployeeFields = {};
      filteredData.forEach((item) => {
        const id = item.projEmplRtKey || item.id;
        if (id) {
          newEditEmployeeBillRate[id] = item.billRtAmt;
          newEditEmployeeFields[id] = {
            lookupType: item.lookupType || "Select",
            rateType: item.sBillRtTypeCd || "Select",
            startDate: item.startDt ? item.startDt.split("T")[0] : "",
            endDate: item.endDt ? item.endDt.split("T")[0] : null,
          };
        }
      });
      setEditEmployeeBillRate(newEditEmployeeBillRate);
      setEditEmployeeFields(newEditEmployeeFields);
    } catch (error) {
      console.error(
        "Error adding employee billing rate:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEmployeeBillRateChange = (id, value) => {
    setEditEmployeeBillRate((prev) => ({
      ...prev,
      [id]: value === "" ? "" : parseFloat(value) || 0,
    }));
  };

  const handleUpdateEmployee = async (id, updatedData) => {
    if (!id) {
      console.error("Invalid ID for update");
      return;
    }
    setLoading(true);
    try {
      const fields = editEmployeeFields[id] || {};
      await axios.put(`https://test-api-3tmq.onrender.com/ProjEmplRt/${id}`, {
        projEmplRtKey: id,
        projId: selectedProjectId,
        emplId: updatedData.empId,
        employeeName: updatedData.employeeName,
        billLabCatCd: updatedData.plc,
        billRtAmt: parseFloat(editEmployeeBillRate[id] || updatedData.billRate),
        startDt: fields.startDate || updatedData.startDate,
        endDt: fields.endDate || updatedData.endDate || null,
        sBillRtTypeCd: fields.rateType || updatedData.rateType,
        lookupType: fields.lookupType || updatedData.lookupType,
        isActive: true,
        modifiedBy: "admin",
      });
      setEmployeeBillingRates((prev) =>
        prev.map((rate) =>
          rate.id === id
            ? {
                ...rate,
                lookupType: fields.lookupType || updatedData.lookupType,
                empId: updatedData.empId,
                employeeName: updatedData.employeeName,
                plc: updatedData.plc,
                plcDescription: plcs.find((plc) => plc.laborCategoryCode === updatedData.plc)?.description || updatedData.plcDescription,
                billRate: parseFloat(editEmployeeBillRate[id] || updatedData.billRate),
                rateType: fields.rateType || updatedData.rateType,
                startDate: fields.startDate || updatedData.startDate,
                endDate: fields.endDate || updatedData.endDate || null,
              }
            : rate
        )
      );
      setEditEmployeeBillRate((prev) => ({
        ...prev,
        [id]: parseFloat(editEmployeeBillRate[id] || updatedData.billRate),
      }));
      setEditEmployeeFields((prev) => ({
        ...prev,
        [id]: {
          lookupType: fields.lookupType || updatedData.lookupType,
          rateType: fields.rateType || updatedData.rateType,
          startDate: fields.startDate || updatedData.startDate,
          endDate: fields.endDate || updatedData.endDate || null,
        },
      }));
      // Refetch employee billing rates to ensure state consistency after update
      const fetchResponse = await axios.get(
        `https://test-api-3tmq.onrender.com/ProjEmplRt`
      );
      const filteredData = fetchResponse.data.filter(
        (item) =>
          item.projId
            .toLowerCase()
            .startsWith(selectedProjectId.toLowerCase()) && item.emplId
      );
      setEmployeeBillingRates(
        filteredData.map((item) => ({
          id: item.projEmplRtKey || item.id,
          lookupType: item.lookupType || "Select",
          empId: item.emplId,
          employeeName:
            item.employeeName ||
            employees.find((emp) => emp.empId === item.emplId)?.employeeName ||
            "",
          plc: item.billLabCatCd,
          plcDescription: item.plcDescription || "",
          billRate: item.billRtAmt,
          rateType: item.sBillRtTypeCd || "Select",
          startDate: item.startDt ? item.startDt.split("T")[0] : "",
          endDate: item.endDt ? item.endDt.split("T")[0] : null,
        }))
      );
      const newEditEmployeeBillRate = {};
      const newEditEmployeeFields = {};
      filteredData.forEach((item) => {
        const id = item.projEmplRtKey || item.id;
        if (id) {
          newEditEmployeeBillRate[id] = item.billRtAmt;
          newEditEmployeeFields[id] = {
            lookupType: item.lookupType || "Select",
            rateType: item.sBillRtTypeCd || "Select",
            startDate: item.startDt ? item.startDt.split("T")[0] : "",
            endDate: item.endDt ? item.endDt.split("T")[0] : null,
          };
        }
      });
      setEditEmployeeBillRate(newEditEmployeeBillRate);
      setEditEmployeeFields(newEditEmployeeFields);
    } catch (error) {
      console.error("Error updating employee billing rate:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEmployee = async (id) => {
    if (!id) {
      console.error("Invalid ID for deletion");
      return;
    }
    setLoading(true);
    try {
      await axios.delete(`https://test-api-3tmq.onrender.com/ProjEmplRt/${id}`);
      setEmployeeBillingRates((prev) => prev.filter((rate) => rate.id !== id));
      setEditEmployeeBillRate((prev) => {
        const newEditEmployeeBillRate = { ...prev };
        delete newEditEmployeeBillRate[id];
        return newEditEmployeeBillRate;
      });
      setEditEmployeeFields((prev) => {
        const newEditEmployeeFields = { ...prev };
        delete newEditEmployeeFields[id];
        return newEditEmployeeFields;
      });
    } catch (error) {
      console.error("Error deleting employee billing rate:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewEmployeeRateChange = (field, value, id = null) => {
    if (id) {
      if (field === "empId") {
        const selectedEmp = employees.find((emp) => emp.empId === value);
        setEmployeeBillingRates((prev) =>
          prev.map((rate) =>
            rate.id === id
              ? {
                  ...rate,
                  empId: value,
                  employeeName: selectedEmp ? selectedEmp.employeeName : rate.employeeName,
                }
              : rate
          )
        );
      } else {
        setEditEmployeeFields((prev) => ({
          ...prev,
          [id]: {
            ...prev[id],
            [field]: value,
          },
        }));
      }
    } else {
      const selectedEmp =
        field === "empId" ? employees.find((emp) => emp.empId === value) : null;
      setNewEmployeeRate((prev) => ({
        ...prev,
        [field]: value,
        ...(field === "empId" && selectedEmp
          ? { employeeName: selectedEmp.employeeName }
          : {}),
      }));
    }
  };

  // Vendor Billing Rates Handlers
  const handleAddVendorRow = () => {
    setNewVendorRate({
      lookupType: "Select",
      vendorId: "",
      vendorName: "",
      vendorEmployee: "",
      vendorEmployeeName: "",
      plc: "",
      billRate: "",
      rateType: "Select",
      startDate: "",
      endDate: "",
    });
  };

  const handleSaveNewVendorRate = async () => {
    if (
      !newVendorRate ||
      !newVendorRate.vendorId ||
      !newVendorRate.vendorName ||
      !newVendorRate.plc ||
      !newVendorRate.startDate ||
      !newVendorRate.billRate
    ) {
      console.error(
        "Please fill all required fields (Vendor ID, Vendor Name, PLC, Bill Rate, Start Date)"
      );
      return;
    }
    setLoading(true);
    try {
      await axios.post(`https://test-api-3tmq.onrender.com/ProjVendRt`, {
        projVendRtKey: 0,
        projId: selectedPlan?.projId,
        vendId: newVendorRate.vendorId,
        vendEmplId: newVendorRate.vendorEmployee,
        billLabCatCd: newVendorRate.plc,
        billDiscRt: 0,
        companyId: "1",
        billRtAmt: parseFloat(newVendorRate.billRate),
        startDt: new Date(newVendorRate.startDate).toISOString(),
        endDt: newVendorRate.endDate
          ? new Date(newVendorRate.endDate).toISOString()
          : null,
        sBillRtTypeCd: newVendorRate.rateType,
        modifiedBy: "admin",
        timeStamp: new Date().toISOString(),
      });
      setNewVendorRate(null);
      const fetchResponse = await axios.get(
        `https://test-api-3tmq.onrender.com/ProjVendRt`
      );
      const filteredData = fetchResponse.data.filter((item) =>
        item.projId.toLowerCase().startsWith(selectedProjectId.toLowerCase())
      );
      setVendorBillingRates(
        filteredData.map((item) => ({
          id: item.id,
          lookupType: item.lookupType || "Select",
          vendorId: item.vendId || "",
          vendorName: item.vendorName || "",
          vendorEmployee: item.vendEmplId || "",
          vendorEmployeeName: item.vendEmplName || "",
          plc: item.billLabCatCd,
          plcDescription: item.description || "",
          billRate: item.billRtAmt,
          rateType: item.sBillRtTypeCd || "Select",
          startDate: new Date(item.startDt).toISOString().split("T")[0],
          endDate: item.endDt
            ? new Date(item.endDt).toISOString().split("T")[0]
            : null,
        }))
      );
    } catch (error) {
      console.error(
        "Error adding vendor billing rate:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVendorBillRateChange = (id, value) => {
    setEditVendorBillRate((prev) => ({
      ...prev,
      [id]: value === "" ? "" : parseFloat(value) || 0,
    }));
  };

  const handleUpdateVendor = async (id, updatedData) => {
    setLoading(true);
    try {
      await axios.put(`https://test-api-3tmq.onrender.com/ProjVendRt/${id}`, {
        id,
        projId: selectedProjectId,
        vendId: updatedData.vendorId,
        vendEmplId: updatedData.vendorEmployee,
        billLabCatCd: updatedData.plc,
        billDiscRt: 0,
        companyId: "1",
        billRtAmt: parseFloat(updatedData.billRate),
        startDt: new Date(updatedData.startDate).toISOString(),
        endDt: updatedData.endDate
          ? new Date(updatedData.endDate).toISOString()
          : null,
        sBillRtTypeCd: updatedData.rateType,
        modifiedBy: "admin",
        timeStamp: new Date().toISOString(),
      });
      setVendorBillingRates((prev) =>
        prev.map((rate) =>
          rate.id === id
            ? {
                ...rate,
                lookupType: updatedData.lookupType,
                vendorId: updatedData.vendorId,
                vendorName: updatedData.vendorName,
                vendorEmployee: updatedData.vendorEmployee,
                vendorEmployeeName: updatedData.vendorEmployeeName,
                plc: updatedData.plc,
                plcDescription: plcs.find((plc) => plc.laborCategoryCode === updatedData.plc)?.description || updatedData.plcDescription,
                billRate: parseFloat(updatedData.billRate),
                rateType: updatedData.rateType,
                startDate: updatedData.startDate,
                endDate: updatedData.endDate || null,
              }
            : rate
        )
      );
      setEditVendorBillRate((prev) => ({
        ...prev,
        [id]: updatedData.billRate,
      }));
    } catch (error) {
      console.error("Error updating vendor billing rate:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteVendor = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`https://test-api-3tmq.onrender.com/ProjVendRt/${id}`);
      setVendorBillingRates((prev) => prev.filter((rate) => rate.id !== id));
      setEditVendorBillRate((prev) => {
        const newEditVendorBillRate = { ...prev };
        delete newEditVendorBillRate[id];
        return newEditVendorBillRate;
      });
    } catch (error) {
      console.error("Error deleting vendor billing rate:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewVendorRateChange = (field, value) => {
    setNewVendorRate((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16 text-xs">
      <div className="mb-4">
        <h3 className="text-xs font-normal">
          Project Labor Categories Billing Rates Schedule
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-1 font-normal">Plc</th>
                <th className="border p-1 font-normal">Bill Rate</th>
                <th className="border p-1 font-normal">Rate Type</th>
                <th className="border p-1 font-normal">Start Date</th>
                <th className="border p-1 font-normal">End Date</th>
                <th className="border p-1 font-normal">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="border p-1 text-center">
                    Loading...
                  </td>
                </tr>
              ) : billingRatesSchedule.length === 0 ? (
                <tr>
                  <td colSpan="6" className="border p-1 text-center">
                    No data available
                  </td>
                </tr>
              ) : (
                billingRatesSchedule.map((item) => (
                  <tr
                    key={item.id}
                    className="sm:table-row flex flex-col sm:flex-row mb-1 sm:mb-0"
                  >
                    <td className="border p-1 sm:w-1/6">
                      <input
                        type="text"
                        value={item.plc}
                        onChange={(e) => {
                          handleNewRateChange("plc", e.target.value);
                          setPlcSearch(e.target.value);
                        }}
                        className="w-full p-1 border rounded text-xs"
                        list="plc-list"
                      />
                      <datalist id="plc-list">
                        {plcs.map((plc) => (
                          <option
                            key={plc.laborCategoryCode}
                            value={plc.laborCategoryCode}
                          >
                            {plc.description}
                          </option>
                        ))}
                      </datalist>
                    </td>
                    <td className="border p-1 sm:w-1/6">
                      <input
                        type="text"
                        value={editBillRate[item.id] ?? item.billRate}
                        onChange={(e) =>
                          handleBillRateChange(item.id, e.target.value)
                        }
                        className="w-full p-1 border rounded text-xs"
                      />
                    </td>
                    <td className="border p-1 sm:w-1/6">
                      <select
                        value={item.rateType}
                        onChange={(e) =>
                          handleNewRateChange("rateType", e.target.value)
                        }
                        className="w-full p-1 border rounded text-xs"
                      >
                        {rateTypeOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="border p-1 sm:w-1/6">
                      <input
                        type="date"
                        value={item.startDate}
                        onChange={(e) =>
                          handleNewRateChange("startDate", e.target.value)
                        }
                        className="w-full p-1 border rounded text-xs"
                      />
                    </td>
                    <td className="border p-1 sm:w-1/6">
                      <input
                        type="date"
                        value={item.endDate || ""}
                        onChange={(e) =>
                          handleNewRateChange("endDate", e.target.value)
                        }
                        className="w-full p-1 border rounded text-xs"
                      />
                    </td>
                    <td className="border p-1 sm:w-1/6">
                      <div className="flex flex-col sm:flex-row justify-center space-y-1 sm:space-y-0 sm:space-x-1">
                        <button
                          onClick={() =>
                            handleUpdate(item.id, {
                              ...item,
                              billRate: editBillRate[item.id] || item.billRate,
                            })
                          }
                          className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-yellow-600 transition w-full sm:w-auto"
                          disabled={loading}
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="bg-red-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-red-600 transition w-full sm:w-auto"
                          disabled={loading}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
              {newRate && (
                <tr className="sm:table-row flex flex-col sm:flex-row mb-1 sm:mb-0">
                  <td className="border p-1 sm:w-1/6">
                    <input
                      type="text"
                      value={newRate.plc || ""}
                      onChange={(e) => {
                        handleNewRateChange("plc", e.target.value);
                        setPlcSearch(e.target.value);
                      }}
                      className="w-full p-1 border rounded text-xs"
                      list="plc-list"
                    />
                    <datalist id="plc-list">
                      {plcs.map((plc) => (
                        <option
                          key={plc.laborCategoryCode}
                          value={plc.laborCategoryCode}
                        >
                          {plc.description}
                        </option>
                      ))}
                    </datalist>
                  </td>
                  <td className="border p-1 sm:w-1/6">
                    <input
                      type="text"
                      value={newRate.billRate || ""}
                      onChange={(e) =>
                        handleNewRateChange("billRate", e.target.value)
                      }
                      className="w-full p-1 border rounded text-xs"
                    />
                  </td>
                  <td className="border p-1 sm:w-1/6">
                    <select
                      value={newRate.rateType}
                      onChange={(e) =>
                        handleNewRateChange("rateType", e.target.value)
                      }
                      className="w-full p-1 border rounded text-xs"
                    >
                      {rateTypeOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="border p-1 sm:w-1/6">
                    <input
                      type="date"
                      value={newRate.startDate || ""}
                      onChange={(e) =>
                        handleNewRateChange("startDate", e.target.value)
                      }
                      className="w-full p-1 border rounded text-xs"
                    />
                  </td>
                  <td className="border p-1 sm:w-1/6">
                    <input
                      type="date"
                      value={newRate.endDate || ""}
                      onChange={(e) =>
                        handleNewRateChange("endDate", e.target.value)
                      }
                      className="w-full p-1 border rounded text-xs"
                    />
                  </td>
                  <td className="border p-1 sm:w-1/6">
                    <div className="flex flex-col sm:flex-row justify-center space-y-1 sm:space-y-0 sm:space-x-1">
                      <button
                        onClick={handleSaveNewRate}
                        className="bg-green-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-green-600 transition w-full sm:w-auto"
                        disabled={loading}
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setNewRate(null)}
                        className="bg-gray-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-gray-600 transition w-full sm:w-auto"
                        disabled={loading}
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              )}
              <tr>
                <td colSpan="6" className="border p-1">
                  <button
                    onClick={handleAddRow}
                    className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-blue-600 transition"
                    disabled={loading || newRate}
                  >
                    Add
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-xs font-normal">Employee Billing Rates Schedule</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-1 font-normal">Lookup Type</th>
                <th className="border p-1 font-normal">Employee</th>
                <th className="border p-1 font-normal">Employee Name</th>
                <th className="border p-1 font-normal">PLC</th>
                <th className="border p-1 font-normal">PLC Description</th>
                <th className="border p-1 font-normal">Bill Rate</th>
                <th className="border p-1 font-normal">Rate Type</th>
                <th className="border p-1 font-normal">Start Date</th>
                <th className="border p-1 font-normal">End Date</th>
                <th className="border p-1 font-normal">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="10" className="border p-1 text-center">
                    Loading...
                  </td>
                </tr>
              ) : employeeBillingRates.length === 0 && !newEmployeeRate ? (
                <tr>
                  <td colSpan="10" className="border p-1 text-center">
                    No data available
                  </td>
                </tr>
              ) : (
                employeeBillingRates.map((item) => (
                  <tr
                    key={item.id}
                    className="sm:table-row flex flex-col sm:flex-row mb-1 sm:mb-0"
                  >
                    <td className="border p-1 sm:w-1/10">
                      <select
                        value={(editEmployeeFields[item.id]?.lookupType) ?? item.lookupType}
                        onChange={(e) =>
                          handleNewEmployeeRateChange(
                            "lookupType",
                            e.target.value,
                            item.id
                          )
                        }
                        className="w-full p-1 border rounded text-xs"
                      >
                        {lookupTypeOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="border p-1 sm:w-1/10">
                      <input
                        type="text"
                        value={item.empId}
                        onChange={(e) =>
                          handleNewEmployeeRateChange(
                            "empId",
                            e.target.value,
                            item.id
                          )
                        }
                        className="w-full p-1 border rounded text-xs"
                        list="employee-list"
                        disabled={employees.length === 0}
                      />
                      <datalist id="employee-list">
                        {employees.map((emp) => (
                          <option key={emp.empId} value={emp.empId}>
                            {emp.employeeName}
                          </option>
                        ))}
                      </datalist>
                    </td>
                    <td className="border p-1 sm:w-1/10">
                      {item.employeeName}
                    </td>
                    <td className="border p-1 sm:w-1/10">
                      <input
                        type="text"
                        value={item.plc}
                        onChange={(e) => {
                          handleNewEmployeeRateChange(
                            "plc",
                            e.target.value,
                            item.id
                          );
                          setPlcSearch(e.target.value);
                        }}
                        className="w-full p-1 border rounded text-xs"
                        list="plc-list"
                        disabled
                      />
                      <datalist id="plc-list">
                        {plcs.map((plc) => (
                          <option
                            key={plc.laborCategoryCode}
                            value={plc.laborCategoryCode}
                          >
                            {plc.description}
                          </option>
                        ))}
                      </datalist>
                    </td>
                    <td className="border p-1 sm:w-1/10">
                      {plcs.find((plc) => plc.laborCategoryCode === item.plc)
                        ?.description || item.plcDescription}
                    </td>
                    <td className="border p-1 sm:w-1/10">
                      <input
                        type="text"
                        value={editEmployeeBillRate[item.id] ?? item.billRate}
                        onChange={(e) =>
                          handleEmployeeBillRateChange(item.id, e.target.value)
                        }
                        className="w-full p-1 border rounded text-xs"
                      />
                    </td>
                    <td className="border p-1 sm:w-1/10">
                      <select
                        value={(editEmployeeFields[item.id]?.rateType) ?? item.rateType}
                        onChange={(e) =>
                          handleNewEmployeeRateChange(
                            "rateType",
                            e.target.value,
                            item.id
                          )
                        }
                        className="w-full p-1 border rounded text-xs"
                      >
                        {rateTypeOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="border p-1 sm:w-1/10">
                      <input
                        type="date"
                        value={(editEmployeeFields[item.id]?.startDate) ?? item.startDate}
                        onChange={(e) =>
                          handleNewEmployeeRateChange(
                            "startDate",
                            e.target.value,
                            item.id
                          )
                        }
                        className="w-full p-1 border rounded text-xs"
                      />
                    </td>
                    <td className="border p-1 sm:w-1/10">
                      <input
                        type="date"
                        value={(editEmployeeFields[item.id]?.endDate) ?? item.endDate ?? ""}
                        onChange={(e) =>
                          handleNewEmployeeRateChange(
                            "endDate",
                            e.target.value,
                            item.id
                          )
                        }
                        className="w-full p-1 border rounded text-xs"
                      />
                    </td>
                    <td className="border p-1 sm:w-1/10">
                      <div className="flex flex-col sm:flex-row justify-center space-y-1 sm:space-y-0 sm:space-x-1">
                        <button
                          onClick={() =>
                            handleUpdateEmployee(item.id, {
                              ...item,
                              billRate:
                                editEmployeeBillRate[item.id] || item.billRate,
                            })
                          }
                          className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-yellow-600 transition w-full sm:w-auto"
                          disabled={loading || !item.id}
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDeleteEmployee(item.id)}
                          className="bg-red-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-red-600 transition w-full sm:w-auto"
                          disabled={loading || !item.id}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
              {newEmployeeRate && (
                <tr className="sm:table-row flex flex-col sm:flex-row mb-1 sm:mb-0">
                  <td className="border p-1 sm:w-1/10">
                    <select
                      value={newEmployeeRate.lookupType}
                      onChange={(e) =>
                        handleNewEmployeeRateChange(
                          "lookupType",
                          e.target.value
                        )
                      }
                      className="w-full p-1 border rounded text-xs"
                    >
                      {lookupTypeOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="border p-1 sm:w-1/10">
                    <input
                      type="text"
                      value={newEmployeeRate.empId || ""}
                      onChange={(e) =>
                        handleNewEmployeeRateChange("empId", e.target.value)
                      }
                      className="w-full p-1 border rounded text-xs"
                      list="employee-list"
                      disabled={employees.length === 0}
                    />
                    <datalist id="employee-list">
                      {employees.map((emp) => (
                        <option key={emp.empId} value={emp.empId}>
                          {emp.employeeName}
                        </option>
                      ))}
                    </datalist>
                  </td>
                  <td className="border p-1 sm:w-1/10">
                    {newEmployeeRate.employeeName || ""}
                  </td>
                  <td className="border p-1 sm:w-1/10">
                    <input
                      type="text"
                      value={newEmployeeRate.plc || ""}
                      onChange={(e) => {
                        handleNewEmployeeRateChange("plc", e.target.value);
                        setPlcSearch(e.target.value);
                      }}
                      className="w-full p-1 border rounded text-xs"
                      list="plc-list"
                    />
                    <datalist id="plc-list">
                      {plcs.map((plc) => (
                        <option
                          key={plc.laborCategoryCode}
                          value={plc.laborCategoryCode}
                        >
                          {plc.description}
                        </option>
                      ))}
                    </datalist>
                  </td>
                  <td className="border p-1 sm:w-1/10">
                    {plcs.find(
                      (plc) => plc.laborCategoryCode === newEmployeeRate.plc
                    )?.description || ""}
                  </td>
                  <td className="border p-1 sm:w-1/10">
                    <input
                      type="text"
                      value={newEmployeeRate.billRate || ""}
                      onChange={(e) =>
                        handleNewEmployeeRateChange("billRate", e.target.value)
                      }
                      className="w-full p-1 border rounded text-xs"
                    />
                  </td>
                  <td className="border p-1 sm:w-1/10">
                    <select
                      value={newEmployeeRate.rateType}
                      onChange={(e) =>
                        handleNewEmployeeRateChange("rateType", e.target.value)
                      }
                      className="w-full p-1 border rounded text-xs"
                    >
                      {rateTypeOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="border p-1 sm:w-1/10">
                    <input
                      type="date"
                      value={newEmployeeRate.startDate || ""}
                      onChange={(e) =>
                        handleNewEmployeeRateChange("startDate", e.target.value)
                      }
                      className="w-full p-1 border rounded text-xs"
                    />
                  </td>
                  <td className="border p-1 sm:w-1/10">
                    <input
                      type="date"
                      value={newEmployeeRate.endDate || ""}
                      onChange={(e) =>
                        handleNewEmployeeRateChange("endDate", e.target.value)
                      }
                      className="w-full p-1 border rounded text-xs"
                    />
                  </td>
                  <td className="border p-1 sm:w-1/10">
                    <div className="flex flex-col sm:flex-row justify-center space-y-1 sm:space-y-0 sm:space-x-1">
                      <button
                        onClick={handleSaveNewEmployeeRate}
                        className="bg-green-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-green-600 transition w-full sm:w-auto"
                        disabled={loading}
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setNewEmployeeRate(null)}
                        className="bg-gray-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-gray-600 transition w-full sm:w-auto"
                        disabled={loading}
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              )}
              <tr>
                <td colSpan="10" className="border p-1">
                  <button
                    onClick={handleAddEmployeeRow}
                    className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-blue-600 transition"
                    disabled={loading || newEmployeeRate}
                  >
                    Add
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-xs font-normal">Vendor Billing Rates Schedule</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-1 font-normal">Lookup Type</th>
                <th className="border p-1 font-normal">Vendor</th>
                <th className="border p-1 font-normal">Vendor Name</th>
                <th className="border p-1 font-normal">Vendor Employee</th>
                <th className="border p-1 font-normal">Vendor Employee Name</th>
                <th className="border p-1 font-normal">PLC</th>
                <th className="border p-1 font-normal">PLC Description</th>
                <th className="border p-1 font-normal">Bill Rate</th>
                <th className="border p-1 font-normal">Rate Type</th>
                <th className="border p-1 font-normal">Start Date</th>
                <th className="border p-1 font-normal">End Date</th>
                <th className="border p-1 font-normal">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="12" className="border p-1 text-center">
                    Loading...
                  </td>
                </tr>
              ) : vendorBillingRates.length === 0 ? (
                <tr>
                  <td colSpan="12" className="border p-1 text-center">
                    No data available
                  </td>
                </tr>
              ) : (
                vendorBillingRates.map((item) => (
                  <tr
                    key={item.id}
                    className="sm:table-row flex flex-col sm:flex-row mb-1 sm:mb-0"
                  >
                    <td className="border p-1 sm:w-1/12">
                      <select
                        value={item.lookupType}
                        onChange={(e) =>
                          setVendorBillingRates((prev) =>
                            prev.map((rate) =>
                              rate.id === item.id
                                ? { ...rate, lookupType: e.target.value }
                                : rate
                            )
                          )
                        }
                        className="w-full p-1 border rounded text-xs"
                      >
                        {lookupTypeOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="border p-1 sm:w-1/12">
                      <input
                        type="text"
                        value={item.vendorId}
                        onChange={(e) =>
                          setVendorBillingRates((prev) =>
                            prev.map((rate) =>
                              rate.id === item.id
                                ? { ...rate, vendorId: e.target.value }
                                : rate
                            )
                          )
                        }
                        className="w-full p-1 border rounded text-xs"
                      />
                    </td>
                    <td className="border p-1 sm:w-1/12">
                      <input
                        type="text"
                        value={item.vendorName}
                        onChange={(e) =>
                          setVendorBillingRates((prev) =>
                            prev.map((rate) =>
                              rate.id === item.id
                                ? { ...rate, vendorName: e.target.value }
                                : rate
                            )
                          )
                        }
                        className="w-full p-1 border rounded text-xs"
                      />
                    </td>
                    <td className="border p-1 sm:w-1/12">
                      <input
                        type="text"
                        value={item.vendorEmployee}
                        onChange={(e) =>
                          setVendorBillingRates((prev) =>
                            prev.map((rate) =>
                              rate.id === item.id
                                ? { ...rate, vendorEmployee: e.target.value }
                                : rate
                            )
                          )
                        }
                        className="w-full p-1 border rounded text-xs"
                      />
                    </td>
                    <td className="border p-1 sm:w-1/12">
                      <input
                        type="text"
                        value={item.vendorEmployeeName}
                        onChange={(e) =>
                          setVendorBillingRates((prev) =>
                            prev.map((rate) =>
                              rate.id === item.id
                                ? {
                                    ...rate,
                                    vendorEmployeeName: e.target.value,
                                  }
                                : rate
                            )
                          )
                        }
                        className="w-full p-1 border rounded text-xs"
                      />
                    </td>
                    <td className="border p-1 sm:w-1/12">
                      <input
                        type="text"
                        value={item.plc}
                        onChange={(e) => {
                          setVendorBillingRates((prev) =>
                            prev.map((rate) =>
                              rate.id === item.id
                                ? { ...rate, plc: e.target.value }
                                : rate
                            )
                          );
                          setPlcSearch(e.target.value);
                        }}
                        className="w-full p-1 border rounded text-xs"
                        list="plc-list"
                      />
                      <datalist id="plc-list">
                        {plcs.map((plc) => (
                          <option
                            key={plc.laborCategoryCode}
                            value={plc.laborCategoryCode}
                          >
                            {plc.description}
                          </option>
                        ))}
                      </datalist>
                    </td>
                    <td className="border p-1 sm:w-1/12">
                      {plcs.find((plc) => plc.laborCategoryCode === item.plc)
                        ?.description || item.plcDescription}
                    </td>
                    <td className="border p-1 sm:w-1/12">
                      <input
                        type="text"
                        value={editVendorBillRate[item.id] ?? item.billRate}
                        onChange={(e) =>
                          handleVendorBillRateChange(item.id, e.target.value)
                        }
                        className="w-full p-1 border rounded text-xs"
                      />
                    </td>
                    <td className="border p-1 sm:w-1/12">
                      <select
                        value={item.rateType}
                        onChange={(e) =>
                          setVendorBillingRates((prev) =>
                            prev.map((rate) =>
                              rate.id === item.id
                                ? { ...rate, rateType: e.target.value }
                                : rate
                            )
                          )
                        }
                        className="w-full p-1 border rounded text-xs"
                      >
                        {rateTypeOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="border p-1 sm:w-1/12">
                      <input
                        type="date"
                        value={item.startDate}
                        onChange={(e) =>
                          setVendorBillingRates((prev) =>
                            prev.map((rate) =>
                              rate.id === item.id
                                ? { ...rate, startDate: e.target.value }
                                : rate
                            )
                          )
                        }
                        className="w-full p-1 border rounded text-xs"
                      />
                    </td>
                    <td className="border p-1 sm:w-1/12">
                      <input
                        type="date"
                        value={item.endDate || ""}
                        onChange={(e) =>
                          setVendorBillingRates((prev) =>
                            prev.map((rate) =>
                              rate.id === item.id
                                ? { ...rate, endDate: e.target.value }
                                : rate
                            )
                          )
                        }
                        className="w-full p-1 border rounded text-xs"
                      />
                    </td>
                    <td className="border p-1 sm:w-1/12">
                      <div className="flex flex-col sm:flex-row justify-center space-y-1 sm:space-y-0 sm:space-x-1">
                        <button
                          onClick={() =>
                            handleUpdateVendor(item.id, {
                              ...item,
                              billRate:
                                editVendorBillRate[item.id] || item.billRate,
                            })
                          }
                          className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-yellow-600 transition w-full sm:w-auto"
                          disabled={loading}
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDeleteVendor(item.id)}
                          className="bg-red-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-red-600 transition w-full sm:w-auto"
                          disabled={loading}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
              {newVendorRate && (
                <tr className="sm:table-row flex flex-col sm:flex-row mb-1 sm:mb-0">
                  <td className="border p-1 sm:w-1/12">
                    <select
                      value={newVendorRate.lookupType}
                      onChange={(e) =>
                        handleNewVendorRateChange("lookupType", e.target.value)
                      }
                      className="w-full p-1 border rounded text-xs"
                    >
                      {lookupTypeOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="border p-1 sm:w-1/12">
                    <input
                      type="text"
                      value={newVendorRate.vendorId || ""}
                      onChange={(e) =>
                        handleNewVendorRateChange("vendorId", e.target.value)
                      }
                      className="w-full p-1 border rounded text-xs"
                    />
                  </td>
                  <td className="border p-1 sm:w-1/12">
                    <input
                      type="text"
                      value={newVendorRate.vendorName || ""}
                      onChange={(e) =>
                        handleNewVendorRateChange("vendorName", e.target.value)
                      }
                      className="w-full p-1 border rounded text-xs"
                    />
                  </td>
                  <td className="border p-1 sm:w-1/12">
                    <input
                      type="text"
                      value={newVendorRate.vendorEmployee || ""}
                      onChange={(e) =>
                        handleNewVendorRateChange(
                          "vendorEmployee",
                          e.target.value
                        )
                      }
                      className="w-full p-1 border rounded text-xs"
                    />
                  </td>
                  <td className="border p-1 sm:w-1/12">
                    <input
                      type="text"
                      value={newVendorRate.vendorEmployeeName || ""}
                      onChange={(e) =>
                        handleNewVendorRateChange(
                          "vendorEmployeeName",
                          e.target.value
                        )
                      }
                      className="w-full p-1 border rounded text-xs"
                    />
                  </td>
                  <td className="border p-1 sm:w-1/12">
                    <input
                      type="text"
                      value={newVendorRate.plc || ""}
                      onChange={(e) => {
                        handleNewVendorRateChange("plc", e.target.value);
                        setPlcSearch(e.target.value);
                      }}
                      className="w-full p-1 border rounded text-xs"
                      list="plc-list"
                    />
                    <datalist id="plc-list">
                      {plcs.map((plc) => (
                        <option
                          key={plc.laborCategoryCode}
                          value={plc.laborCategoryCode}
                        >
                          {plc.description}
                        </option>
                      ))}
                    </datalist>
                  </td>
                  <td className="border p-1 sm:w-1/12">
                    {plcs.find(
                      (plc) => plc.laborCategoryCode === newVendorRate.plc
                    )?.description || ""}
                  </td>
                  <td className="border p-1 sm:w-1/12">
                    <input
                      type="text"
                      value={newVendorRate.billRate || ""}
                      onChange={(e) =>
                        handleNewVendorRateChange("billRate", e.target.value)
                      }
                      className="w-full p-1 border rounded text-xs"
                    />
                  </td>
                  <td className="border p-1 sm:w-1/12">
                    <select
                      value={newVendorRate.rateType}
                      onChange={(e) =>
                        handleNewVendorRateChange("rateType", e.target.value)
                      }
                      className="w-full p-1 border rounded text-xs"
                    >
                      {rateTypeOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="border p-1 sm:w-1/12">
                    <input
                      type="date"
                      value={newVendorRate.startDate || ""}
                      onChange={(e) =>
                        handleNewVendorRateChange("startDate", e.target.value)
                      }
                      className="w-full p-1 border rounded text-xs"
                    />
                  </td>
                  <td className="border p-1 sm:w-1/12">
                    <input
                      type="date"
                      value={newVendorRate.endDate || ""}
                      onChange={(e) =>
                        handleNewVendorRateChange("endDate", e.target.value)
                      }
                      className="w-full p-1 border rounded text-xs"
                    />
                  </td>
                  <td className="border p-1 sm:w-1/12">
                    <div className="flex flex-col sm:flex-row justify-center space-y-1 sm:space-y-0 sm:space-x-1">
                      <button
                        onClick={handleSaveNewVendorRate}
                        className="bg-green-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-green-600 transition w-full sm:w-auto"
                        disabled={loading}
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setNewVendorRate(null)}
                        className="bg-gray-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-gray-600 transition w-full sm:w-auto"
                        disabled={loading}
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              )}
              <tr>
                <td colSpan="12" className="border p-1">
                  <button
                    onClick={handleAddVendorRow}
                    className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-normal hover:bg-blue-600 transition"
                    disabled={loading || newVendorRate}
                  >
                    Add
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PLCComponent;