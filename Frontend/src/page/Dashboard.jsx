
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    activeEmployees: 0,
    inactiveEmployees: 0,
    totalDepartments: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const getDashboardStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:5000/api/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStats({
          totalEmployees: response.data.totalEmployees,
          activeEmployees: response.data.activeEmployees,
          inactiveEmployees: response.data.inactiveEmployees,
          totalDepartments: response.data.totalDepartments,
        });
      } catch (error) {
        setError("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    getDashboardStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="flex items-center justify-between bg-white px-6 py-4 shadow">
        <h1 className="text-2xl font-bold text-blue-600">
          StaffSphere
        </h1>

        <button
          onClick={handleLogout}
          className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Logout
        </button>
      </nav>

      <div className="p-6">
        <h2 className="mb-2 text-3xl font-bold text-gray-800">
          Dashboard
        </h2>

        <p className="mb-6 text-gray-600">
          Welcome to your employee management system.
        </p>

        {loading ? (
          <p>Loading dashboard...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-white p-6 shadow">
              <p className="text-gray-500">Total Employees</p>
              <h3 className="mt-3 text-3xl font-bold">
                {stats.totalEmployees}
              </h3>
            </div>

            <div className="rounded-xl bg-white p-6 shadow">
              <p className="text-gray-500">Active Employees</p>
              <h3 className="mt-3 text-3xl font-bold text-green-600">
                {stats.activeEmployees}
              </h3>
            </div>

            <div className="rounded-xl bg-white p-6 shadow">
              <p className="text-gray-500">Inactive Employees</p>
              <h3 className="mt-3 text-3xl font-bold text-red-600">
                {stats.inactiveEmployees}
              </h3>
            </div>

            <div className="rounded-xl bg-white p-6 shadow">
              <p className="text-gray-500">Departments</p>
              <h3 className="mt-3 text-3xl font-bold text-blue-600">
                {stats.totalDepartments}
              </h3>
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/employees"
            className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
          >
            View Employees
          </Link>

          <Link
            to="/employees/add"
            className="rounded-lg bg-green-600 px-5 py-3 text-white hover:bg-green-700"
          >
            Add Employee
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
