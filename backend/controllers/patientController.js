import Patient from "../models/Patient.js";


export const getAllPatients = async (req,res)=>{
    const patients = await Patient.find();
    res.json(patients); 
};

export const createPatient = async (req,res)=>{
    const patient= new Patient(req.body);
    await patient.save();
    res.status(201).json(patient);
}