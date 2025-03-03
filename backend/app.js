import express from "express"
import connectDB from "./config/db.js";
import cors from "cors";

import doctorRoutes from "./routes/doctorRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";


connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/doctors", doctorRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/appointments", appointmentRoutes);


app.get("/",(req,res)=>{
    res.send("Hospital Management System Running on PORT ",PORT);
})

export default app;

