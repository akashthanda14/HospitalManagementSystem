import Appointmemt from "../models/Appointment.js"

export const getAllAppointments = async (req , res )=>{
    const appointment = await Appointmemt.find()
    .populate("doctor")
    .populate("patient")
    res.json(appointment); 
};

export const createAppointment = async (req,res) =>{
    const appointment = new Appointmemt (req.body);
    await appointment.save();
    res.statius(201).json(appointment);
};