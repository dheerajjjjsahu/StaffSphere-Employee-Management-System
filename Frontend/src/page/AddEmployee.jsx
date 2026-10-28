import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function AddEmployee() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [salary, setSalary] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [status, setStatus] = useState("Active");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/employees",
        {
          name,
          email,
          phone,
          department,
          designation,
          salary: Number(salary),
          joiningDate,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Employee added successfully");
      navigate("/employees");
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="mb-5 text-2xl font-bold">Add Employee</h1>

      {error && <p className="mb-4 text-red-600">{error}</p>}

      <form onSubmit={handleSubmit} className="max-w-lg space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full rounded border p-2"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded border p-2"
        />

        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="w-full rounded border p-2"
        />

        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
          className="w-full rounded border p-2"
        >
          <option value="">Select Department</option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
          <option value="Sales">Sales</option>
          <option value="Marketing">Marketing</option>
        </select>

        <input
          type="text"
          placeholder="Designation"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
          required
          className="w-full rounded border p-2"
        />

        <input
          type="number"
          placeholder="Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          min="0"
          required
          className="w-full rounded border p-2"
        />

        <label className="block">Joining Date</label>
        <input
          type="date"
          value={joiningDate}
          onChange={(e) => setJoiningDate(e.target.value)}
          required
          className="w-full rounded border p-2"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full rounded border p-2"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Add Employee
        </button>

        <Link to="/employees" className="ml-4 text-blue-600">
          Back
        </Link>
      </form>
    </div>
  );
}

export default AddEmployee;