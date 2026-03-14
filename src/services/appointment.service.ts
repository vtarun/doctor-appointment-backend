import { appointmentRepository } from "../repositories/appointment.repository"
import { availabilitRepository } from "../repositories/availability.repository";
import { doctorRepository } from "../repositories/doctor.respository";
import { AppError } from "../utils/appError";

export const appointmentService = {
    async createAppointment(patientId : string, data: any ){
        const startTime = new Date(data.startTime);
        const endTime = new Date(data.endTime);
        const current = new Date();

        if(startTime >= endTime){
            throw new AppError('Invalid appointment window', 400);
        }

        if(startTime < current){
            throw new AppError('Cannot book past appointments', 400);
        }

        const doctorId = data.doctorId;
        const doctor = await doctorRepository.findByUserId(doctorId);
        if(!doctor){
            throw new AppError('Doctor profile not found', 404);
        }

        if(doctor.verificationStatus !== 'VERIFIED'){
            throw new AppError('Doctor not verified', 403);
        }

        const availability = await availabilitRepository.getAvailability(doctorId);

        const slotInsideAvailability = availability.some((w: any) => (startTime >= w.startTime && endTime < w.endTime ));

        if(!slotInsideAvailability){
            throw new AppError('Slot outside doctor availability', 400);
        }

        const conflict = await appointmentRepository.findConflictAppointment(doctorId, startTime);
        
        if(conflict){
            throw new AppError('Slot already booked', 409);
        }

        try{
            return appointmentRepository.createAppointment({doctorId, patientId, startTime, endTime});
        }catch(err: any){
            if(err.code === 11000) {
                throw new AppError('Slot already booked', 409);
            }

            throw err;
        }
    },

    async findDoctorAppointments(doctorId : string){
        return appointmentRepository.findDoctorAppointments(doctorId);
    },

    async findPatientAppointments(patientId : string){
         return appointmentRepository.findPatientAppointments(patientId);
    },
    
    async cancelAppointment(){},

    async updateAppointment(){},

    

}