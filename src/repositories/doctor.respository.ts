import { ClientSession } from "mongoose";
import { DoctorModel } from "../models/doctor.model";

export const doctorRepository = {
    async createDoctorProfile(data: any){
        return DoctorModel.create(data);
    },

    async findByUserId(userId: string){
        return DoctorModel.findOne({userId}).lean();
    },

    async findById(id: string, session: ClientSession){
        const query = DoctorModel.findById(id).lean();
        if(session) query.session(session);

        return query.exec();
    },
    
    async getVerifiedDoctors(){
        return DoctorModel.find({ verificationStatus: 'VERIFIED' }).populate('userId', 'name email').lean();
    },

    async getVerifiedDoctorById(doctorId: string){
        return DoctorModel.findOne({_id: doctorId, verificationStatus: 'VERIFIED'} ).populate('userId', 'name email').lean();
    },

    async updateStatus(doctorId: string, status: string){
        return DoctorModel.findByIdAndUpdate(doctorId, {verificationStatus: status}, {new : true}).lean();
    }
}