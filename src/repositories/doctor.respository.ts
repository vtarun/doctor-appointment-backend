import { UserModel } from "../models/user.model";

export const doctorRepository = {
    async createProfile(){
        return UserModel.findById();
    },
    
    async getVerifiedDoctors(){
        return DoctorModel.find({ verificationStatus: 'VERIFIED' }).populate('userId', 'name email').lean();
    },

    async getVerifiedDoctorById(doctorId: string){
        return DoctorModel.findOne({_id: doctorId, verificationStatus: 'VERIFIED'} ).populate('userId', 'name email').lean();
    }
}