import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    
});

export const DoctorModel = mongoose.model('Doctor', doctorSchema);