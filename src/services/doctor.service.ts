import { doctorRepository } from '../repositories/doctorRepository';

export const doctorService = { 
    async createProfile(){
        return doctorRepository.createProfile();
    },
    
    async getVerifiedDoctors(){
        return doctorRepository.getVerifiedDoctors();
    },

    async getVerifiedDoctorById(doctorId: string){
        return doctorRepository.getVerifiedDoctorById(doctorId);
    }

    
}