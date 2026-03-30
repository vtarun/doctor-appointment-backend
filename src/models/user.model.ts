import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, unique: true, required: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ['PATIENT', 'DOCTOR', 'ADMIN'] },
    plan: { type: String, enum: ['free_user', 'standard', 'premium'], default: 'free_user'}
},{ timestamps: true });

export const UserModel = mongoose.model('User', userSchema);