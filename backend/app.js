import express from "express"
import connectDB from "./config/db.js";
import cors from "cors";

import doctorRoutes from "./routes/doctorRoutes.js";
import hospitalRoutes from "./routes/hospitalRoutes.js";


connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/doctors", doctorRoutes);
app.use("/api/hospitals", hospitalRoutes);


app.get("/",(req,res)=>{
    res.send("Hospital Management System Running on PORT ",PORT);
})

export default app;

