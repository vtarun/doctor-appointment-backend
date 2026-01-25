import { doctorRepository } from "../repositories/doctor.respository";
import { AppError } from "../utils/appError";


export const adminService = {
    async verifyDoctor(doctorId: string, status: string){
        const updated = await doctorRepository.updateStatus(doctorId, status);
        
        if(!updated){
            throw new AppError('Doctor not found', 404);
        }

        return updated;
    },

    async rejectDoctor(doctorId: string, status: string){
        const updated = await doctorRepository.updateStatus(doctorId, status);

        if(!updated){
            throw new AppError('Doctor not found', 404);
        }

        return updated;
    }

}