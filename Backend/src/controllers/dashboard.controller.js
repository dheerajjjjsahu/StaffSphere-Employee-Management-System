import Employee from "../models/employee.model.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalEmployees = await Employee.countDocuments();
    const activeEmployees = await Employee.countDocuments({ status: "Active" });
    const inactiveEmployees = await Employee.countDocuments({ status: "Inactive" });

    const departments = await Employee.distinct("department");

    res.status(200).json({
      success: true,
      totalEmployees,
      activeEmployees,
      inactiveEmployees,
      totalDepartments: departments.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get dashboard statistics",
    });
  }
};
