import mongoose from "mongoose";

const patientSchema = mongoose.Schema({
           name :{type : String , required : true},
           diagnosis :{type : String , required : true},
         phone : {type : Number , required : true},
         age : {type : String , required : true},
         gender : {type: String , required:true},
})

const Patient = mongoose.model("Patient",patientSchema);

export default Patient;