import { Request, Response, NextFunction } from "express";
import { doctorRepository } from "../repositories/doctor.respository";
import { AppError } from "../utils/appError";
import { availabilitRepository } from "../repositories/availability.repository";

function normaliseAndValidate(windows: Array<{startTime: string, endTime: string}>){
    const currentTime = new Date();
    
    const parsed = windows.map((w) => ({
        startTime : new Date(w.startTime),
        endTime : new Date(w.endTime)        
    }));

    for(const w of parsed){
        if(Number.isNaN(w.startTime.getTime()) || Number.isNaN(w.endTime.getTime()) ){
            throw new AppError('Invalid datetime format', 400);
        }

        if(w.startTime >= w.endTime){
            throw new AppError('startTime must be before endTime', 400);
        }

        if(w.startTime < currentTime){
            throw new AppError('Availability must be in the future', 400);
        }
    }

    const sortedTimeList = parsed.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());

        
    for(let i=0;i<sortedTimeList.length -1; i++){
        if(sortedTimeList[i]!.endTime > sortedTimeList[i+1]!.startTime){
            throw new AppError('Overlapping availability windows', 400);
        }    
    }

    return sortedTimeList;
}

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
    },

    async createBulkAvailability(doctorId: string, data: any){
        const doctor = await doctorRepository.findByUserId(doctorId);
        
        if(!doctor){
            throw new AppError('Doctor profile not found', 404); 
        }

        if(doctor.verificationStatus !== 'VERIFIED'){
            throw new AppError('Doctor not verified', 403);
        }

        const normalised = normaliseAndValidate(data);


        return availabilitRepository.createBulkAvailability(normalised.map(w => ({
            doctorId: doctor._id.toString(),
            startTime: w.startTime,
            endTime: w.endTime
        })));
    },

    // async deleteAvailability(doctorId: string, availabilityId: string){
    //     const doctor = await doctorRepository.findByUserId(doctorId);

    //     if(!doctor){
    //          throw new AppError('Doctor profile not found', 404);
    //     }
    // }
}
