import { DoctorModel } from '../models/doctor.model';
import { doctorRepository } from '../repositories/doctor.respository';
import { userRepository } from '../repositories/user.repository';
import { AppError } from '../utils/appError';

export const doctorService = { 
    async createDoctorProfile(userId: string, data: any){
        const existingDoctor = await doctorRepository.findByUserId(userId);

        if(existingDoctor){
            throw new AppError('Doctor already exists', 400);
        }
        const doctor = await doctorRepository.createDoctorProfile({userId, ...data, "verificationStatus": "PENDING"});

        return doctor;
    },
    
    async getVerifiedDoctors(){
        return doctorRepository.getVerifiedDoctors();
    },

    async getVerifiedDoctorById(doctorId: string){
        return doctorRepository.getVerifiedDoctorById(doctorId);
    }

    
}