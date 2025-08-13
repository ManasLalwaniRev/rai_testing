// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const EmployeeHoursCeilings = ({ projectId, isSearched, updatedBy = "user" }) => {
//   const [employees, setEmployees] = useState([]);
//   const [isDataFetched, setIsDataFetched] = useState(false);
//   const [editIndex, setEditIndex] = useState(null);
//   const [editRow, setEditRow] = useState({});

//   // Validate projectId format (e.g., "PROJ\d{3}")
//   const isValidProjectId = (id) => id && id.match(/^PROJ\d{3}$/);

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       if (isSearched && isValidProjectId(projectId)) {
//         try {
//           const response = await axios.get(
//             `https://test-api-3tmq.onrender.com/Project/GetEmployeesByProjectId/${projectId}`
//           );
//           const data = response.data || [];
//           setEmployees(data.map(emp => ({
//             emplId: emp.emplId || "",
//             firstName: emp.firstName || "",
//             lastName: emp.lastName || "",
//             laborCategory: emp.plcGlcCode || "",
//             hoursCeiling: emp.perHourRate || 0
//           })));
//           setIsDataFetched(true);
//         } catch (error) {
//           console.error("Error fetching employees:", error);
//           setEmployees([]);
//           setIsDataFetched(true);
//         }
//       } else if (!isValidProjectId(projectId)) {
//         setEmployees([]);
//         setIsDataFetched(false);
//       }
//     };
//     fetchEmployees();
//   }, [projectId, isSearched]);

//   const handleHoursChange = (emplId, value) => {
//     setEmployees((prevEmployees) =>
//       prevEmployees.map((emp) =>
//         emp.emplId === emplId ? { ...emp, hoursCeiling: value } : emp
//       )
//     );
//   };

//   const handleEditClick = (index) => {
//     setEditIndex(index);
//     setEditRow({ hoursCeiling: employees[index].hoursCeiling });
//   };

//   const handleEditChange = (e) => {
//     const { value } = e.target;
//     setEditRow((prev) => ({ ...prev, hoursCeiling: value }));
//   };

//   const handleUpdate = async (index) => {
//     const emp = employees[index];
//     const requestBody = {
//       projectId,
//       employeeId: emp.emplId,
//       laborCategoryId: emp.laborCategory,
//       hoursCeiling: parseFloat(editRow.hoursCeiling) || 0,
//       applyToRbaCode: "N" // Default value, can be adjusted
//     };
//     try {
//       await axios.put(
//         `https://test-api-3tmq.onrender.com/Project/UpdateCeilingHrForEmp?updatedBy=${updatedBy}`,
//         requestBody
//       );
//       setEmployees((prev) =>
//         prev.map((emp, i) =>
//           i === index ? { ...emp, hoursCeiling: requestBody.hoursCeiling } : emp
//         )
//       );
//       setEditIndex(null);
//       setEditRow({});
//     } catch (error) {
//       alert("Failed to update. Please try again.");
//     }
//   };

//   const handleNewClick = () => {
//     setEmployees((prev) => [
//       ...prev,
//       { emplId: "", firstName: "", lastName: "", laborCategory: "", hoursCeiling: "" }
//     ]);
//   };

//   const handleSaveNew = async (index) => {
//     const emp = employees[index];
//     const requestBody = {
//       projectId,
//       employeeId: emp.emplId,
//       laborCategoryId: emp.laborCategory,
//       hoursCeiling: parseFloat(emp.hoursCeiling) || 0,
//       applyToRbaCode: "N" // Default value, can be adjusted
//     };
//     if (!emp.emplId || !emp.laborCategory || !emp.hoursCeiling) {
//       alert("Please fill all fields.");
//       return;
//     }
//     try {
//       await axios.post(
//         `https://test-api-3tmq.onrender.com/Project/CreateCeilingHrForEmp?updatedBy=${updatedBy}`,
//         requestBody
//       );
//       // Refresh data
//       const response = await axios.get(
//         `https://test-api-3tmq.onrender.com/Project/GetAllCeilingHrForEmp?projId=${projectId}`
//       );
//       const data = response.data || [];
//       setEmployees(data.map(emp => ({
//         emplId: emp.emplId || "",
//         firstName: emp.firstName || "",
//         lastName: emp.lastName || "",
//         laborCategory: emp.plcGlcCode || "",
//         hoursCeiling: emp.perHourRate || 0
//       })));
//     } catch (error) {
//       alert("Failed to save. Please check your input and try again.");
//     }
//   };

//   const handleDeleteUI = (index) => {
//     setEmployees((prev) => prev.filter((_, i) => i !== index));
//   };

//   if (!isSearched || !isValidProjectId(projectId)) {
//     return (
//       <div className="text-gray-600">
//         Please search for a project to view details.
//       </div>
//     );
//   }

//   return (
//     <div className="animate-fade-in">
//       <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-md">
//         <div className="mb-4">
//           <h2 className="text-xl font-bold text-gray-900 mb-2">
//             Employee Hours Ceilings
//           </h2>
//           <div className="flex items-center mb-2">
//             <label className="text-sm font-medium text-gray-700 mr-2">
//               Project:
//             </label>
//             <span className="text-sm text-gray-900">{projectId}</span>
//             <span className="ml-4 text-sm text-gray-900">Org ID: 1.02</span>
//           </div>
//           <button
//             className="mb-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs"
//             onClick={handleNewClick}
//           >
//             New
//           </button>
//         </div>
//         {employees.length === 0 ? (
//           <p className="text-gray-600">No data available for this project ID.</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full text-left border-collapse">
//               <thead className="bg-gray-100 border-b border-gray-200">
//                 <tr>
//                   <th className="px-2 py-1 text-gray-700 font-semibold text-xs">
//                     Empl ID
//                   </th>
//                   <th className="px-2 py-1 text-gray-700 font-semibold text-xs">
//                     Employee Name
//                   </th>
//                   <th className="px-2 py-1 text-gray-700 font-semibold text-xs">
//                     Labor Category
//                   </th>
//                   <th className="px-2 py-1 text-gray-700 font-semibold text-xs">
//                     Hours Ceiling
//                   </th>
//                   <th className="px-2 py-1 text-gray-700 font-semibold text-xs">
//                     Action
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {employees.map((emp, index) => (
//                   <tr
//                     key={emp.emplId || index}
//                     className="bg-white border-b border-gray-200 hover:bg-gray-50"
//                   >
//                     <td className="px-2 py-1 text-xs text-gray-900 font-normal">
//                       {emp.emplId}
//                     </td>
//                     <td className="px-2 py-1 text-xs text-gray-900 font-normal">
//                       {`${emp.lastName}, ${emp.firstName}`}
//                     </td>
//                     <td className="px-2 py-1 text-xs text-gray-900 font-normal">
//                       {emp.laborCategory}
//                     </td>
//                     <td className="px-2 py-1 text-xs text-gray-900 font-normal">
//                       {editIndex === index ? (
//                         <input
//                           type="text"
//                           value={editRow.hoursCeiling || ""}
//                           onChange={handleEditChange}
//                           className="w-full px-2 py-1 border border-gray-300 rounded-md text-xs font-normal"
//                           placeholder="0.00"
//                         />
//                       ) : (
//                         <span className="font-normal">{emp.hoursCeiling}</span>
//                       )}
//                     </td>
//                     <td className="px-2 py-1 flex gap-1">
//                       {editIndex === index ? (
//                         <button
//                           onClick={() => handleUpdate(index)}
//                           className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-xs"
//                         >
//                           Update
//                         </button>
//                       ) : (
//                         <>
//                           <button
//                             onClick={() => handleEditClick(index)}
//                             className="px-2 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 text-xs"
//                           >
//                             Edit
//                           </button>
//                           <button
//                             onClick={() => handleDeleteUI(index)}
//                             className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-xs"
//                           >
//                             Delete
//                           </button>
//                         </>
//                       )}
//                       {!emp.emplId && (
//                         <button
//                           onClick={() => handleSaveNew(index)}
//                           className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-xs"
//                         >
//                           Save
//                         </button>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EmployeeHoursCeilings;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FaEdit, FaTrash, FaSave, FaPlus } from "react-icons/fa";

// const EmployeeHoursCeilings = ({ projectId, isSearched, updatedBy = "user" }) => {
//   const [employees, setEmployees] = useState([]);
//   const [employeeSuggestions, setEmployeeSuggestions] = useState([]);
//   const [laborCategories, setLaborCategories] = useState([]);
//   const [isDataFetched, setIsDataFetched] = useState(false);
//   const [editIndex, setEditIndex] = useState(null);
//   const [editRow, setEditRow] = useState({});
//   const [isValidId, setIsValidId] = useState(true);

//   // Validate projectId format (e.g., "PROJ\d{3}")
//   const isValidProjectId = (id) => id && id.match(/^PROJ\d{3}$/);

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsValidId(isValidProjectId(projectId));
//       if (!isSearched || !isValidProjectId(projectId)) {
//         setEmployees([]);
//         setIsDataFetched(false);
//         return;
//       }

//       // Fetch employee suggestions
//       try {
//         const empResponse = await axios.get(
//           `https://test-api-3tmq.onrender.com/Project/GetEmployeesByProject/${projectId}`
//         );
//         const empData = empResponse.data || [];
//         setEmployeeSuggestions(Array.isArray(empData) ? empData : []);
//       } catch (error) {
//         console.error("Error fetching employee suggestions:", error);
//         setEmployeeSuggestions([]);
//       }

//       // Fetch current hours ceilings
//       try {
//         const ceilingResponse = await axios.get(
//           `https://test-api-3tmq.onrender.com/Project/GetAllCeilingHrForEmp?projId=${projectId}`
//         );
//         const ceilingData = ceilingResponse.data || [];
//         setEmployees(
//           Array.isArray(ceilingData)
//             ? ceilingData.map((emp) => ({
//                 emplId: emp.emplId || "",
//                 employeeName: `${emp.lastName || ""}, ${emp.firstName || ""}`,
//                 laborCategory: emp.plcGlcCode || "",
//                 hoursCeiling: emp.perHourRate || 0,
//               }))
//             : []
//         );
//       } catch (error) {
//         console.error("Error fetching ceiling data:", error);
//         setEmployees([]);
//       }

//       // Fetch labor categories
//       try {
//         const laborResponse = await axios.get(
//           `https://test-api-3tmq.onrender.com/Project/GetAllPlcs/W`
//         );
//         const laborData = laborResponse.data || [];
//         setLaborCategories(Array.isArray(laborData) ? laborData : []);
//       } catch (error) {
//         console.error("Error fetching labor categories:", error);
//         setLaborCategories([]);
//       }

//       setIsDataFetched(true);
//     };
//     fetchData();
//   }, [projectId, isSearched]);

//   const handleEditClick = (index) => {
//     setEditIndex(index);
//     setEditRow(employees[index]);
//   };

//   const handleEditChange = (field, value) => {
//     setEditRow((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleEmployeeIdChange = (index, value) => {
//     const selected = employeeSuggestions.find((sug) => sug.empId === value);
//     if (selected) {
//       setEditRow((prev) => ({
//         ...prev,
//         emplId: selected.empId,
//         employeeName: selected.employeeName,
//       }));
//     } else {
//       setEditRow((prev) => ({ ...prev, emplId: value, employeeName: "" }));
//     }
//   };

//   const handleLaborCategoryChange = (index, value) => {
//     const selected = laborCategories.find((cat) => cat.laborCategoryCode === value);
//     if (selected) {
//       setEditRow((prev) => ({
//         ...prev,
//         laborCategory: selected.laborCategoryCode,
//       }));
//     } else {
//       setEditRow((prev) => ({ ...prev, laborCategory: value }));
//     }
//   };

//   const handleUpdate = async (index) => {
//     const updatedEmp = editRow;
//     const requestBody = {
//       projectId,
//       employeeId: updatedEmp.emplId,
//       laborCategoryId: updatedEmp.laborCategory,
//       hoursCeiling: parseFloat(updatedEmp.hoursCeiling) || 0,
//       applyToRbaCode: "N",
//     };
//     try {
//       await axios.put(
//         `https://test-api-3tmq.onrender.com/Project/UpdateCeilingHrForEmp?updatedBy=${updatedBy}`,
//         requestBody
//       );
//       setEmployees((prev) =>
//         prev.map((emp, i) => (i === index ? updatedEmp : emp))
//       );
//       toast.success("Update successful");
//       setEditIndex(null);
//       setEditRow({});
//     } catch (error) {
//       toast.error("Failed to update");
//     }
//   };

//   const handleNewClick = () => {
//     const newIndex = employees.length;
//     setEmployees((prev) => [
//       ...prev,
//       { emplId: "", employeeName: "", laborCategory: "", hoursCeiling: "" },
//     ]);
//     setEditIndex(newIndex);
//     setEditRow({ emplId: "", employeeName: "", laborCategory: "", hoursCeiling: "" });
//   };

//   const handleSaveNew = async (index) => {
//     const newEmp = editRow;
//     if (!newEmp.emplId || !newEmp.laborCategory || !newEmp.hoursCeiling) {
//       toast.error("Please fill all fields");
//       return;
//     }
//     const requestBody = {
//       projectId,
//       employeeId: newEmp.emplId,
//       laborCategoryId: newEmp.laborCategory,
//       hoursCeiling: parseFloat(newEmp.hoursCeiling) || 0,
//       applyToRbaCode: "A",
//     };
//     try {
//       await axios.post(
//         `https://test-api-3tmq.onrender.com/Project/CreateCeilingHrForEmp?updatedBy=${updatedBy}`,
//         requestBody
//       );
//       toast.success("Save successful");
//       // Refresh data
//       const response = await axios.get(
//         `https://test-api-3tmq.onrender.com/Project/GetAllCeilingHrForEmp?projId=${projectId}`
//       );
//       const data = response.data || [];
//       setEmployees(
//         Array.isArray(data)
//           ? data.map((emp) => ({
//               emplId: emp.emplId || "",
//               employeeName: `${emp.lastName || ""}, ${emp.firstName || ""}`,
//               laborCategory: emp.plcGlcCode || "",
//               hoursCeiling: emp.perHourRate || 0,
//             }))
//           : []
//       );
//       setEditIndex(null);
//       setEditRow({});
//     } catch (error) {
//       toast.error("Failed to save");
//     }
//   };

//   const handleDeleteUI = (index) => {
//     setEmployees((prev) => prev.filter((_, i) => i !== index));
//     toast.info("Row deleted (UI only; implement API delete if needed)");
//   };

//   if (!isSearched) {
//     return <div className="text-gray-600">Please search for a project to view details.</div>;
//   }

//   if (!isValidId) {
//     return <div className="text-red-600">Invalid project ID.</div>;
//   }

//   return (
//     <div className="animate-fade-in">
//       <ToastContainer />
//       <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-md">
//         <div className="mb-4">
//           <h2 className="text-xl font-bold text-gray-900 mb-2">Employee Hours Ceilings</h2>
//           <div className="flex items-center mb-2">
//             <label className="text-sm font-medium text-gray-700 mr-2">Project:</label>
//             <span className="text-sm text-gray-900">{projectId}</span>
//             <span className="ml-4 text-sm text-gray-900">Org ID: 1.02</span>
//           </div>
//           <button
//             className="mb-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs flex items-center"
//             onClick={handleNewClick}
//           >
//             <FaPlus className="mr-1" /> New
//           </button>
//         </div>
//         {employees.length === 0 && isDataFetched ? (
//           <p className="text-gray-600">No data available for this project ID.</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full text-left border-collapse">
//               <thead className="bg-gray-100 border-b border-gray-200">
//                 <tr>
//                   <th className="px-2 py-1 text-gray-700 font-semibold text-xs">Empl ID</th>
//                   <th className="px-2 py-1 text-gray-700 font-semibold text-xs">Employee Name</th>
//                   <th className="px-2 py-1 text-gray-700 font-semibold text-xs">Labor Category</th>
//                   <th className="px-2 py-1 text-gray-700 font-semibold text-xs">Hours Ceiling</th>
//                   <th className="px-2 py-1 text-gray-700 font-semibold text-xs">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {employees.map((emp, index) => (
//                   <tr
//                     key={emp.emplId || index}
//                     className="bg-white border-b border-gray-200 hover:bg-gray-50"
//                   >
//                     <td className="px-2 py-1 text-xs text-gray-900 font-normal">
//                       {editIndex === index ? (
//                         <>
//                           <input
//                             list={`empSuggestions-${index}`}
//                             value={editRow.emplId || ""}
//                             onChange={(e) => handleEmployeeIdChange(index, e.target.value)}
//                             className="w-full px-2 py-1 border border-gray-300 rounded-md text-xs font-normal"
//                             placeholder="Search Empl ID"
//                           />
//                           <datalist id={`empSuggestions-${index}`}>
//                             {employeeSuggestions.map((sug) => (
//                               <option key={sug.empId} value={sug.empId}>
//                                 {sug.empId} - {sug.employeeName}
//                               </option>
//                             ))}
//                           </datalist>
//                         </>
//                       ) : (
//                         emp.emplId
//                       )}
//                     </td>
//                     <td className="px-2 py-1 text-xs text-gray-900 font-normal">
//                       {editIndex === index ? (
//                         <input
//                           type="text"
//                           value={editRow.employeeName || ""}
//                           disabled
//                           className="w-full px-2 py-1 border border-gray-300 rounded-md text-xs font-normal"
//                         />
//                       ) : (
//                         emp.employeeName
//                       )}
//                     </td>
//                     <td className="px-2 py-1 text-xs text-gray-900 font-normal">
//                       {editIndex === index ? (
//                         <>
//                           <input
//                             list={`laborSuggestions-${index}`}
//                             value={editRow.laborCategory || ""}
//                             onChange={(e) => handleLaborCategoryChange(index, e.target.value)}
//                             className="w-full px-2 py-1 border border-gray-300 rounded-md text-xs font-normal"
//                             placeholder="Search Labor Category"
//                           />
//                           <datalist id={`laborSuggestions-${index}`}>
//                             {laborCategories.map((cat, idx) => (
//                               <option key={idx} value={cat.laborCategoryCode}>
//                                 {cat.laborCategoryCode} - {cat.description}
//                               </option>
//                             ))}
//                           </datalist>
//                         </>
//                       ) : (
//                         emp.laborCategory
//                       )}
//                     </td>
//                     <td className="px-2 py-1 text-xs text-gray-900 font-normal">
//                       {editIndex === index ? (
//                         <input
//                           type="number"
//                           value={editRow.hoursCeiling || ""}
//                           onChange={(e) => handleEditChange("hoursCeiling", e.target.value)}
//                           className="w-full px-2 py-1 border border-gray-300 rounded-md text-xs font-normal"
//                           placeholder="0.00"
//                         />
//                       ) : (
//                         emp.hoursCeiling
//                       )}
//                     </td>
//                     <td className="px-2 py-1 flex gap-1">
//                       {editIndex === index ? (
//                         <button
//                           onClick={() => (emp.emplId ? handleUpdate(index) : handleSaveNew(index))}
//                           className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-xs"
//                         >
//                           <FaSave />
//                         </button>
//                       ) : (
//                         <>
//                           <button
//                             onClick={() => handleEditClick(index)}
//                             className="px-2 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 text-xs"
//                           >
//                             <FaEdit />
//                           </button>
//                           <button
//                             onClick={() => handleDeleteUI(index)}
//                             className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-xs"
//                           >
//                             <FaTrash />
//                           </button>
//                         </>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EmployeeHoursCeilings;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrash, FaSave, FaPlus, FaTimes } from "react-icons/fa";

const EmployeeHoursCeilings = ({ projectId, isSearched, updatedBy = "user" }) => {
  const [employees, setEmployees] = useState([]);
  const [employeeSuggestions, setEmployeeSuggestions] = useState([]);
  const [laborCategories, setLaborCategories] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editRow, setEditRow] = useState({});
  const [isValidId, setIsValidId] = useState(true);

  // Validate projectId format (e.g., "PROJ\d{3}")
  const isValidProjectId = (id) => id && id.match(/^PROJ\d{3}$/);

  useEffect(() => {
    const fetchData = async () => {
      setIsValidId(isValidProjectId(projectId));
      if (!isSearched || !isValidProjectId(projectId)) {
        setEmployees([]);
        setIsDataFetched(false);
        return;
      }

      // Fetch employee suggestions
      try {
        const empResponse = await axios.get(
          `https://test-api-3tmq.onrender.com/Project/GetEmployeesByProject/${projectId}`
        );
        const empData = empResponse.data || [];
        setEmployeeSuggestions(Array.isArray(empData) ? empData : []);
      } catch (error) {
        console.error("Error fetching employee suggestions:", error);
        setEmployeeSuggestions([]);
      }

      // Fetch current hours ceilings
      try {
        const ceilingResponse = await axios.get(
          `https://test-api-3tmq.onrender.com/Project/GetAllCeilingHrForEmp?projId=${projectId}`
        );
        const ceilingData = ceilingResponse.data || [];
        setEmployees(
          Array.isArray(ceilingData)
            ? ceilingData.map((emp) => ({
                emplId: emp.emplId || "",
                employeeName: `${emp.lastName || ""}, ${emp.firstName || ""}`,
                laborCategory: emp.plcGlcCode || "",
                hoursCeiling: emp.perHourRate || 0,
              }))
            : []
        );
      } catch (error) {
        console.error("Error fetching ceiling data:", error);
        setEmployees([]);
      }

      // Fetch labor categories
      try {
        const laborResponse = await axios.get(
          `https://test-api-3tmq.onrender.com/Project/GetAllPlcs/W`
        );
        const laborData = laborResponse.data || [];
        setLaborCategories(Array.isArray(laborData) ? laborData : []);
      } catch (error) {
        console.error("Error fetching labor categories:", error);
        setLaborCategories([]);
      }

      setIsDataFetched(true);
    };
    fetchData();
  }, [projectId, isSearched]);

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditRow(employees[index]);
  };

  const handleEditChange = (field, value) => {
    setEditRow((prev) => ({ ...prev, [field]: value }));
  };

  const handleEmployeeIdChange = (index, value) => {
    const selected = employeeSuggestions.find((sug) => sug.empId === value);
    if (selected) {
      setEditRow((prev) => ({
        ...prev,
        emplId: selected.empId,
        employeeName: selected.employeeName,
      }));
    } else {
      setEditRow((prev) => ({ ...prev, emplId: value, employeeName: "" }));
    }
  };

  const handleLaborCategoryChange = (index, value) => {
    const selected = laborCategories.find((cat) => cat.laborCategoryCode === value);
    if (selected) {
      setEditRow((prev) => ({
        ...prev,
        laborCategory: selected.laborCategoryCode,
      }));
    } else {
      setEditRow((prev) => ({ ...prev, laborCategory: value }));
    }
  };

  const handleUpdate = async (index) => {
    const updatedEmp = editRow;
    const requestBody = {
      projectId,
      employeeId: updatedEmp.emplId,
      laborCategoryId: updatedEmp.laborCategory,
      hoursCeiling: parseFloat(updatedEmp.hoursCeiling) || 0,
      applyToRbaCode: "N",
    };
    try {
      await axios.put(
        `https://test-api-3tmq.onrender.com/Project/UpdateCeilingHrForEmp?updatedBy=${updatedBy}`,
        requestBody
      );
      setEmployees((prev) =>
        prev.map((emp, i) => (i === index ? updatedEmp : emp))
      );
      toast.success("Update successful");
      setEditIndex(null);
      setEditRow({});
    } catch (error) {
      toast.error("Failed to update");
    }
  };

  const handleNewClick = () => {
    const newIndex = employees.length;
    setEmployees((prev) => [
      ...prev,
      { emplId: "", employeeName: "", laborCategory: "", hoursCeiling: "" },
    ]);
    setEditIndex(newIndex);
    setEditRow({ emplId: "", employeeName: "", laborCategory: "", hoursCeiling: "" });
  };

  const handleSaveNew = async (index) => {
    const newEmp = editRow;
    if (!newEmp.emplId || !newEmp.laborCategory || !newEmp.hoursCeiling) {
      toast.error("Please fill all fields");
      return;
    }
    const requestBody = {
      projectId,
      employeeId: newEmp.emplId,
      laborCategoryId: newEmp.laborCategory,
      hoursCeiling: parseFloat(newEmp.hoursCeiling) || 0,
      applyToRbaCode: "N",
    };
    try {
      await axios.post(
        `https://test-api-3tmq.onrender.com/Project/CreateCeilingHrForEmp?updatedBy=${updatedBy}`,
        requestBody
      );
      toast.success("Save successful");
      // Refresh data
      const response = await axios.get(
        `https://test-api-3tmq.onrender.com/Project/GetAllCeilingHrForEmp?projId=${projectId}`
      );
      const data = response.data || [];
      setEmployees(
        Array.isArray(data)
          ? data.map((emp) => ({
              emplId: emp.emplId || "",
              employeeName: `${emp.lastName || ""}, ${emp.firstName || ""}`,
              laborCategory: emp.plcGlcCode || "",
              hoursCeiling: emp.perHourRate || 0,
            }))
          : []
      );
      setEditIndex(null);
      setEditRow({});
    } catch (error) {
      toast.error("Failed to save");
    }
  };

  const handleCancel = (index, isNew) => {
    if (isNew) {
      setEmployees((prev) => prev.filter((_, i) => i !== index));
    }
    setEditIndex(null);
    setEditRow({});
  };

  const handleDeleteUI = (index) => {
    setEmployees((prev) => prev.filter((_, i) => i !== index));
    toast.info("Row deleted (UI only; implement API delete if needed)");
  };

  if (!isSearched) {
    return <div className="text-gray-600">Please search for a project to view details.</div>;
  }

  if (!isValidId) {
    return <div className="text-red-600">Invalid project ID.</div>;
  }

  return (
    <div className="animate-fade-in">
      <ToastContainer />
      <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-md">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Employee Hours Ceilings</h2>
          <div className="flex items-center mb-2">
            <label className="text-sm font-medium text-gray-700 mr-2">Project:</label>
            <span className="text-sm text-gray-900">{projectId}</span>
            <span className="ml-4 text-sm text-gray-900">Org ID: 1.02</span>
          </div>
          <button
            className="mb-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs flex items-center"
            onClick={handleNewClick}
          >
            New
          </button>
        </div>
        {employees.length === 0 && isDataFetched ? (
          <p className="text-gray-600">No data available for this project ID.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-2 py-1 text-gray-700 font-semibold text-xs">Empl ID</th>
                  <th className="px-2 py-1 text-gray-700 font-semibold text-xs">Employee Name</th>
                  <th className="px-2 py-1 text-gray-700 font-semibold text-xs">Labor Category</th>
                  <th className="px-2 py-1 text-gray-700 font-semibold text-xs">Hours Ceiling</th>
                  <th className="px-2 py-1 text-gray-700 font-semibold text-xs">Action</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp, index) => (
                  <tr
                    key={emp.emplId || index}
                    className="bg-white border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-2 py-1 text-xs text-gray-900 font-normal">
                      {editIndex === index ? (
                        <>
                          <input
                            list={`empSuggestions-${index}`}
                            value={editRow.emplId || ""}
                            onChange={(e) => handleEmployeeIdChange(index, e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md text-xs font-normal"
                            placeholder="Search Empl ID"
                          />
                          <datalist id={`empSuggestions-${index}`}>
                            {employeeSuggestions.map((sug) => (
                              <option key={sug.empId} value={sug.empId}>
                                {sug.empId} - {sug.employeeName}
                              </option>
                            ))}
                          </datalist>
                        </>
                      ) : (
                        emp.emplId
                      )}
                    </td>
                    <td className="px-2 py-1 text-xs text-gray-900 font-normal">
                      {editIndex === index ? (
                        <input
                          type="text"
                          value={editRow.employeeName || ""}
                          disabled
                          className="w-full px-2 py-1 border border-gray-300 rounded-md text-xs font-normal"
                        />
                      ) : (
                        emp.employeeName
                      )}
                    </td>
                    <td className="px-2 py-1 text-xs text-gray-900 font-normal">
                      {editIndex === index ? (
                        <>
                          <input
                            list={`laborSuggestions-${index}`}
                            value={editRow.laborCategory || ""}
                            onChange={(e) => handleLaborCategoryChange(index, e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md text-xs font-normal"
                            placeholder="Search Labor Category"
                          />
                          <datalist id={`laborSuggestions-${index}`}>
                            {laborCategories.map((cat, idx) => (
                              <option key={idx} value={cat.laborCategoryCode}>
                                {cat.laborCategoryCode} - {cat.description}
                              </option>
                            ))}
                          </datalist>
                        </>
                      ) : (
                        emp.laborCategory
                      )}
                    </td>
                    <td className="px-2 py-1 text-xs text-gray-900 font-normal">
                      {editIndex === index ? (
                        <input
                          type="number"
                          value={editRow.hoursCeiling || ""}
                          onChange={(e) => handleEditChange("hoursCeiling", e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md text-xs font-normal"
                          placeholder="0.00"
                        />
                      ) : (
                        emp.hoursCeiling
                      )}
                    </td>
                    <td className="px-2 py-1 flex gap-1">
                      {editIndex === index ? (
                        <>
                          <button
                            onClick={() => (emp.emplId ? handleUpdate(index) : handleSaveNew(index))}
                            className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-xs"
                          >
                            <FaSave />
                          </button>
                          <button
                            onClick={() => handleCancel(index, !emp.emplId)}
                            className="px-2 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 text-xs"
                          >
                            <FaTimes />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEditClick(index)}
                            className="px-2 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 text-xs"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDeleteUI(index)}
                            className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-xs"
                          >
                            <FaTrash />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeHoursCeilings;
