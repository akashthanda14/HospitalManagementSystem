import Doctor from "../models/Doctor.js";


export const getAllDoctors = async (req,res)=>{
    const doctor = await Doctor.find();
    res.json(doctor); 
};

export const createDoctor = async (req,res)=>{
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).json(doctor);
};