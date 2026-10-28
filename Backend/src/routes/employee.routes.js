import express from "express";
import { addEmployee, getEmployees, getEmployeeById, updateEmployee, deleteEmployee } from "../controllers/employee.controller.js";

const router = express.Router();

router.get("/", getEmployees);
router.post("/", addEmployee);

router.get("/:id", getEmployeeById);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

export default router;
