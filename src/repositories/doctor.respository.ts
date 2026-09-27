import { ClientSession } from "mongoose";
import { DoctorModel } from "../models/doctor.model";

export const doctorRepository = {
    async createDoctorProfile(data: any, session?: ClientSession){
        const docs = await DoctorModel.create([data], {...(session && {session})});
        return docs[0];
    },

    async findByUserId(userId: string){
        return DoctorModel.findOne({userId}).lean();
    },

    async findById(id: string, session?: ClientSession){
        const query = DoctorModel.findById(id).lean();
        if(session) query.session(session);

        return query.exec();
    },
    
    async getVerifiedDoctors(speciality?: string){
        const filter: Record<string, string> = { verificationStatus: 'VERIFIED' }
        if(speciality) filter.speciality = speciality;
        return DoctorModel.find(filter).populate('userId', 'name email').lean();
    },

    async getVerifiedDoctorById(doctorId: string){
        return DoctorModel.findOne({_id: doctorId, verificationStatus: 'VERIFIED'} ).populate('userId', 'name email').lean();
    },

    async updateStatus(doctorId: string, status: string){
        return DoctorModel.findByIdAndUpdate(doctorId, {verificationStatus: status}, {new : true}).lean();
    }
}
