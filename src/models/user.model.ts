import mongoose from "mongoose";
// import { lowercase } from "zod";
// import { required } from "zod/v4/core/util.cjs";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, unique: true, required: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ['PATIENT', 'DOCTOR', 'ADMIN'] },
},{ timestamps: true });

export const UserModel = mongoose.model('User', userSchema);