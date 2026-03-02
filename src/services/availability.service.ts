import { Request, Response, NextFunction } from "express";
import { doctorRepository } from "../repositories/doctor.respository";
import { AppError } from "../utils/appError";
import { availabilitRepository } from "../repositories/availability.repository";

export const availabilityService = {
    async createAvailability(doctorId: string, data: any) {
        const doctor = await doctorRepository.findByUserId(doctorId);
        
        if(!doctor){
            throw new AppError('Doctor profile not found', 404);
        }

        if(doctor.verificationStatus !== 'VERIFIED'){
            throw new AppError('Doctor not verified', 403);
        }

        const start = new Date(data.startTime);
        const end = new Date(data.endTime);

        if(start >= end) {
            throw new AppError('Invalid availability window', 400);
        }

        if(start < new Date()){
            throw new AppError('Availability must be in the future', 400);
        }

        return availabilitRepository.createAvailability({
            doctorId: doctor._id.toString(),
            startTime: start,
            endTime: end
        });
    },
    async getAvailability(doctorId: string){
        return availabilitRepository.getAvailability(doctorId);
    }
}
