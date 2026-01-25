import { DoctorModel } from "../models/doctor.model";
import { UserModel } from "../models/user.model";

export const doctorRepository = {
    async createDoctorProfile(data: any){
        return DoctorModel.create(data);
    },

    async findByUserId(userId: string){
        return DoctorModel.findOne({userId}).lean();
    },
    
    async getVerifiedDoctors(){
        return DoctorModel.find({ verificationStatus: 'VERIFIED' }).populate('userId', 'name email').lean();
    },

    async getVerifiedDoctorById(doctorId: string){
        return DoctorModel.findOne({_id: doctorId, verificationStatus: 'VERIFIED'} ).populate('userId', 'name email').lean();
    }
}