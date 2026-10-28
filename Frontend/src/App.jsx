import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import Login from "./page/Login";
import Register from "./page/Register";
import Dashboard from "./page/Dashboard";
import Employees from "./page/Employees";
import AddEmployee from "./page/AddEmployee";
import EditEmployee from "./page/EditEmployee";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/employees",
    element: (
      <ProtectedRoute>
        <Employees />
      </ProtectedRoute>
    ),
  },
  {
    path: "/employees/add",
    element: (
      <ProtectedRoute>
        <AddEmployee />
      </ProtectedRoute>
    ),
  },
  {
    path: "/employees/edit/:id",
    element: (
      <ProtectedRoute>
        <EditEmployee />
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;