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
    
    async cancelAppointment(appointmentId: string, userId: string, role: string){
        const appointment = await this.getAppointmentById(appointmentId, userId, role);
        if(!appointment){
            throw new AppError('Appointment not found', 404);
        }

        if(appointment.status === 'CANCELLED'){
            throw new AppError('Appointment already cancelled', 400);
        }

        if(appointment.status === 'COMPLETED'){
            throw new AppError('Completed appointment can not be cancelled', 400);
        }

        return appointmentRepository.updateStatus(appointmentId, 'CANCELLED');
    },

    async completeAppointment(appointmentId: string, userId: string){
        const appointment = await appointmentRepository.findById(appointmentId);
        if(!appointment){
            throw new AppError('Appointment not found', 404);
        }

        if(appointment.status === 'COMPLETED'){
            throw new AppError('Appointment already completed', 400);
        }

        if(appointment.status === 'CANCELLED'){
            throw new AppError('Cancelled appointment can not be completed', 400);
        }
        
        return appointmentRepository.updateStatus(appointmentId, 'COMPLETED');
    },

    async listForUser(userId: string, role: string){
        if(role === 'PATIENT'){
            return appointmentRepository.findPatientAppointments(userId);
        }

        if(role === 'DOCTOR'){
            const doctor = await doctorRepository.findByUserId(userId);
            if(!doctor){
                throw new AppError('Doctor profile not found', 404);
            }

            return appointmentRepository.findDoctorAppointments(doctor._id.toString());
        }

        throw new AppError('Forbidded', 403);
    },
    
    async addDoctorNotes(appointmentId: string, userId: string, doctorNotes: string){
        const appointment = await appointmentRepository.findById(appointmentId);
        if(!appointment){
            throw new AppError('Appointment not found', 404);
        }

        const doctor = await doctorRepository.findByUserId(userId);

        if(!doctor || appointment.doctorId.toString() !== doctor._id.toString()){
            throw new AppError('Forbidded', 403);
        }

        if(appointment.status === 'CANCELLED'){
            throw new AppError('Canot add notes to cancelled appointment', 400);
        }

        return appointmentRepository.updateNotes(appointmentId, doctorNotes);
    },

    async getAppointmentById(appointmentId: string, userId: string, role: string){
        const appointment = await appointmentRepository.findById(appointmentId);

        if(!appointment){
            throw new AppError('Appointment not found', 404);
        }

        if(role === 'ADMIN'){
            return appointment;
        }
        const isPatient = appointment.patientId.toString() === userId;
        let isDoctor = false;

        if(role === 'DOCTOR'){
            const doctor = await doctorRepository.findByUserId(userId);
            isDoctor = Boolean(doctor && doctor._id.toString() === appointment.doctorId.toString());
        }

        if(!isPatient && !isDoctor){
            throw new AppError('Forbidden', 403);
        }

        return appointment;
    }



}