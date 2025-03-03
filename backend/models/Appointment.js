import mongoose from "mongoose";

const appointmentSchema = mongoose.Schema({
    patient:{type : mongoose.Schema.Types.ObjectId, ref : 'Patient'},
    doctor:{type : mongoose.Schema.Types.ObjectId, ref : 'Doctor'},
    date:{type : Date , required : true},
    status : {type:String , default : "Sechudled"}
});

const Appointment = mongoose.model("Appointmemt" , appointmentSchema);

export default Appointment;