import mongoose from "mongoose";

const doctorSchema = mongoose.Schema({
           name :{type : String , required : true},
 Specialization :{type : String , required : true},
         phone : {type : String , required : true},
         email : {type : String , required :true}
});

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;