import React, { useState, useEffect } from "react";
import axios from "axios";

const EmployeeHoursCeilings = ({ projectId, isSearched, updatedBy = "user" }) => {
  const [employees, setEmployees] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editRow, setEditRow] = useState({});

  // Validate projectId format (e.g., "PROJ\d{3}")
  const isValidProjectId = (id) => id && id.match(/^PROJ\d{3}$/);

  useEffect(() => {
    const fetchEmployees = async () => {
      if (isSearched && isValidProjectId(projectId)) {
        try {
          const response = await axios.get(
            `https://test-api-3tmq.onrender.com/Project/GetEmployeesByProjectId/${projectId}`
          );
          const data = response.data || [];
          setEmployees(data.map(emp => ({
            emplId: emp.emplId || "",
            firstName: emp.firstName || "",
            lastName: emp.lastName || "",
            laborCategory: emp.plcGlcCode || "",
            hoursCeiling: emp.perHourRate || 0
          })));
          setIsDataFetched(true);
        } catch (error) {
          console.error("Error fetching employees:", error);
          setEmployees([]);
          setIsDataFetched(true);
        }
      } else if (!isValidProjectId(projectId)) {
        setEmployees([]);
        setIsDataFetched(false);
      }
    };
    fetchEmployees();
  }, [projectId, isSearched]);

  const handleHoursChange = (emplId, value) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) =>
        emp.emplId === emplId ? { ...emp, hoursCeiling: value } : emp
      )
    );
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditRow({ hoursCeiling: employees[index].hoursCeiling });
  };

  const handleEditChange = (e) => {
    const { value } = e.target;
    setEditRow((prev) => ({ ...prev, hoursCeiling: value }));
  };

  const handleUpdate = async (index) => {
    const emp = employees[index];
    const requestBody = {
      projectId,
      employeeId: emp.emplId,
      laborCategoryId: emp.laborCategory,
      hoursCeiling: parseFloat(editRow.hoursCeiling) || 0,
      applyToRbaCode: "N" // Default value, can be adjusted
    };
    try {
      await axios.put(
        `https://test-api-3tmq.onrender.com/Project/UpdateCeilingHrForEmp?updatedBy=${updatedBy}`,
        requestBody
      );
      setEmployees((prev) =>
        prev.map((emp, i) =>
          i === index ? { ...emp, hoursCeiling: requestBody.hoursCeiling } : emp
        )
      );
      setEditIndex(null);
      setEditRow({});
    } catch (error) {
      alert("Failed to update. Please try again.");
    }
  };

  const handleNewClick = () => {
    setEmployees((prev) => [
      ...prev,
      { emplId: "", firstName: "", lastName: "", laborCategory: "", hoursCeiling: "" }
    ]);
  };

  const handleSaveNew = async (index) => {
    const emp = employees[index];
    const requestBody = {
      projectId,
      employeeId: emp.emplId,
      laborCategoryId: emp.laborCategory,
      hoursCeiling: parseFloat(emp.hoursCeiling) || 0,
      applyToRbaCode: "N" // Default value, can be adjusted
    };
    if (!emp.emplId || !emp.laborCategory || !emp.hoursCeiling) {
      alert("Please fill all fields.");
      return;
    }
    try {
      await axios.post(
        `https://test-api-3tmq.onrender.com/Project/CreateCeilingHrForEmp?updatedBy=${updatedBy}`,
        requestBody
      );
      // Refresh data
      const response = await axios.get(
        `https://test-api-3tmq.onrender.com/Project/GetAllCeilingHrForEmp?projId=${projectId}`
      );
      const data = response.data || [];
      setEmployees(data.map(emp => ({
        emplId: emp.emplId || "",
        firstName: emp.firstName || "",
        lastName: emp.lastName || "",
        laborCategory: emp.plcGlcCode || "",
        hoursCeiling: emp.perHourRate || 0
      })));
    } catch (error) {
      alert("Failed to save. Please check your input and try again.");
    }
  };

  const handleDeleteUI = (index) => {
    setEmployees((prev) => prev.filter((_, i) => i !== index));
  };

  if (!isSearched || !isValidProjectId(projectId)) {
    return (
      <div className="text-gray-600">
        Please search for a project to view details.
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-md">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Employee Hours Ceilings
          </h2>
          <div className="flex items-center mb-2">
            <label className="text-sm font-medium text-gray-700 mr-2">
              Project:
            </label>
            <span className="text-sm text-gray-900">{projectId}</span>
            <span className="ml-4 text-sm text-gray-900">Org ID: 1.02</span>
          </div>
          <button
            className="mb-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs"
            onClick={handleNewClick}
          >
            New
          </button>
        </div>
        {employees.length === 0 ? (
          <p className="text-gray-600">No data available for this project ID.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-2 py-1 text-gray-700 font-semibold text-xs">
                    Empl ID
                  </th>
                  <th className="px-2 py-1 text-gray-700 font-semibold text-xs">
                    Employee Name
                  </th>
                  <th className="px-2 py-1 text-gray-700 font-semibold text-xs">
                    Labor Category
                  </th>
                  <th className="px-2 py-1 text-gray-700 font-semibold text-xs">
                    Hours Ceiling
                  </th>
                  <th className="px-2 py-1 text-gray-700 font-semibold text-xs">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp, index) => (
                  <tr
                    key={emp.emplId || index}
                    className="bg-white border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-2 py-1 text-xs text-gray-900 font-normal">
                      {emp.emplId}
                    </td>
                    <td className="px-2 py-1 text-xs text-gray-900 font-normal">
                      {`${emp.lastName}, ${emp.firstName}`}
                    </td>
                    <td className="px-2 py-1 text-xs text-gray-900 font-normal">
                      {emp.laborCategory}
                    </td>
                    <td className="px-2 py-1 text-xs text-gray-900 font-normal">
                      {editIndex === index ? (
                        <input
                          type="text"
                          value={editRow.hoursCeiling || ""}
                          onChange={handleEditChange}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md text-xs font-normal"
                          placeholder="0.00"
                        />
                      ) : (
                        <span className="font-normal">{emp.hoursCeiling}</span>
                      )}
                    </td>
                    <td className="px-2 py-1 flex gap-1">
                      {editIndex === index ? (
                        <button
                          onClick={() => handleUpdate(index)}
                          className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-xs"
                        >
                          Update
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEditClick(index)}
                            className="px-2 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 text-xs"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteUI(index)}
                            className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-xs"
                          >
                            Delete
                          </button>
                        </>
                      )}
                      {!emp.emplId && (
                        <button
                          onClick={() => handleSaveNew(index)}
                          className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-xs"
                        >
                          Save
                        </button>
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