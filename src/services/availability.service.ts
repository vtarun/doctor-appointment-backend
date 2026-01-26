import { availabilityRepository } from "../repositories/availability.repository";
import { doctorRepository } from "../repositories/doctor.respository";
import { AppError } from "../utils/appError";

export const availabilityService = {
    async createAvailability(doctorId: string, data: any){
        const doctor = await doctorRepository.findByUserId(doctorId);
        if(!doctor){
            throw new AppError('Doctor profile not found', 404);
        }

        if(doctor.verificationStatus !== 'VERIFIED'){ 
            throw new AppError('Doctor not verified', 403);            
        }

        const start =  new Date(data.startTime);
        const end =  new Date(data.endTime);
        if(start >= end){
            throw new AppError('Invalid availabolity window', 400);
        }

        if(start < new Date()){
            throw new AppError('Availabolity must be in future', 400);
        }

        return availabilityRepository.createAvailability({
            doctorId: doctor._id.toString(),
            startTime: start,
            endTime: end
        });
    },

    async deleteAvailability(id: string, doctorId: string){
        return availabilityRepository.deleteAvailability(id, doctorId);
    },

    async availabilityOfDoctor(doctorId: string){
        return availabilityRepository.availabilityOfSlots(doctorId);
    }

}