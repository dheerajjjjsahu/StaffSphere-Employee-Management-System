import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const getEmployees = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "https://staffsphere-employee-management-system.onrender.com/api/employees",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            search,
            department,
            status,
          },
        }
      );

      setEmployees(response.data.employees);
      setError("");
    } catch (error) {
      setError("Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEmployees();
  }, [search, department, status]);

  const deleteEmployee = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `https://staffsphere-employee-management-system.onrender.com/api/employees/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      getEmployees();
    } catch (error) {
      setError("Failed to delete employee");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-gray-800">
          Employees
        </h1>

        <Link
          to="/employees/add"
          className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          Add Employee
        </Link>
      </div>

      <div className="mb-6 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg border bg-white p-3"
        />

        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="rounded-lg border bg-white p-3"
        >
          <option value="">All Departments</option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
          <option value="Sales">Sales</option>
          <option value="Marketing">Marketing</option>
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-lg border bg-white p-3"
        >
          <option value="">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {loading ? (
        <p>Loading employees...</p>
      ) : error ? (
        <p className="mb-4 text-red-600">{error}</p>
      ) : employees.length === 0 ? (
        <p className="rounded-lg bg-white p-6 text-gray-600">
          No employees found.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg bg-white shadow">
          <table className="w-full text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Department</th>
                <th className="p-3">Designation</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {employees.map((employee) => (
                <tr key={employee._id} className="border-t">
                  <td className="p-3">{employee.name}</td>
                  <td className="p-3">{employee.email}</td>
                  <td className="p-3">{employee.department}</td>
                  <td className="p-3">{employee.designation}</td>
                  <td className="p-3">{employee.status}</td>
                  <td className="flex gap-3 p-3">
                    <Link
                      to={`/employees/edit/${employee._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => deleteEmployee(employee._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Link
        to="/dashboard"
        className="mt-6 inline-block text-blue-600 hover:underline"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}

export default Employees;
