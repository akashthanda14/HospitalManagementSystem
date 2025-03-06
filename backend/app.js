import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import doctorRoutes from "./routes/doctorRoutes.js";
import hospitalRoutes from "./routes/HospitalRoutes.js";
import dotenv from "dotenv"; // Added for env vars

// Load environment variables (MUST be before DB connection)
dotenv.config({ path: ".env.production" });

// Database connection (now happens after env config)
connectDB();

const app = express();

// Enhanced CORS configuration for production
app.use(cors({
  origin: process.env.CLIENT_URL, // Frontend URL from env
  credentials: true // If using cookies/auth headers
}));

app.use(express.json());

// Routes remain unchanged
app.use("/api/doctors", doctorRoutes);
app.use("/api/hospitals", hospitalRoutes);

// Modified root route response
app.get("/", (req, res) => {
    res.send(`Hospital Management System Running on PORT ${process.env.PORT}`);
});

export default app;