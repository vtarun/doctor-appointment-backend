import mongoose from "mongoose";
// import { timeStamp } from "node:console";

const doctorSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true},
    speciality : {type: String, required: true, trim: true},
    experienceYears: { type: Number, required: true, min: 0 }, 
    bio: { type: String, required: true, trim: true }, 
    credentials: [{ type: String, trim: true }], 
    verificationStatus: { type: String, enum: ['PENDING', 'VERIFIED', 'REJECTED'], default: 'PENDING' },
    qualification: {
        type: String,
        enum: ["MBBS", "MS", "MD", "GOD"],
        required: true
    },
    clinicName: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    consultationType: {
        type: String,
        enum: ["ONLINE", "IN_PERSON", "BOTH"],
        required: true
    },
    consultationFee: { type: Number, required: true, min: 0 },

}, { timestamps: true });

export const DoctorModel = mongoose.model('Doctor', doctorSchema);