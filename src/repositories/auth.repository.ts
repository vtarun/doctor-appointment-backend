import { ClientSession } from "mongoose";
import { UserModel } from "../models/user.model";

const normalizeEmail = (email: string) => email.trim().toLowerCase();

export const authRepository = {
    async findByEmail(email: string){
        return UserModel.findOne({ email: normalizeEmail(email) }).select('+passwordHash');
    },

    async createUser(data: {name: string, email: string, gender: string, dateOfBirth: string, passwordHash: string, role?: string} ){        
        return UserModel.create({...data, email: normalizeEmail(data.email)});
    },

    async onboardPatient(email: string){
        return UserModel.findOneAndUpdate(
          { email, role: null },
          { $set: { role: 'PATIENT' } },
          { new: true, runValidators: true }
        );
    },

    async onboardDoctor(userId: string, data: any, session: ClientSession){
        return UserModel.findOneAndUpdate(
            { _id: userId, role: null },
            {
                $set: {
                    name: data.fullname,
                    dateOfBirth: data.dateOfBirth,
                    gender: data.gender,
                    role: "DOCTOR"
                }
            },
            { new: true, runValidators: true, session }
        );
    }

    
}
