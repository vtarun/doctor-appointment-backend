
import { doctorRepository } from '../repositories/doctor.respository';
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
    
    async getVerifiedDoctors(speciality?: string){
        return doctorRepository.getVerifiedDoctors(speciality);
    },

    async getVerifiedDoctorById(doctorId: string){
        return doctorRepository.getVerifiedDoctorById(doctorId);
    },

    async getme(doctorId: string){
        return doctorRepository.findByUserId(doctorId);
    }

    
}
