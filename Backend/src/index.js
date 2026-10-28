import dotenv from "dotenv";
dotenv.config();
import employeeRoutes from "./routes/employee.routes.js";
import authRoutes from "./routes/auth.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import dns from "node:dns";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

dns.setServers(["8.8.8.8", "1.1.1.1"]);


const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/employees", employeeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "StaffSphere API is running",
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
