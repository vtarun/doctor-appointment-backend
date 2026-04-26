import { videoProvider } from "../providers";
import { appointmentRepository } from "../repositories/appointment.repository";
import { doctorRepository } from "../repositories/doctor.respository";
import { AppError } from "../utils/appError";


export const videoService = {
    async generateJoinToken(appointmentId: string, userId: string, role: string){
        const appointment = await appointmentRepository.findById(appointmentId);

        if(!appointment){
            throw new AppError('Appointment not found', 404);
        }

        if(appointment.consultationType !== 'VIDEO'){
            throw new AppError('This appointment is not a video consultation', 400);
        }

        if(appointment.status !== 'BOOKED') {
            throw new AppError('Video session not valid for this appointment', 400);
        }

        if(!appointment.videoSessionId) {
            throw new AppError('Video session not initialized', 400);
        }

        const now = new Date();
        const start = new Date(appointment.startTime);
        const end = new Date(appointment.endTime);

        const joinStartsTime = new Date(start.getTime() - 30 * 60 * 1000);
        const tokenExpiresTime = new Date(end.getTime() + 30 * 60 * 1000);

        if( now < joinStartsTime){
            throw new AppError('Video session can be open 30 minutes prior to start time', 400);
        }

        if( now > tokenExpiresTime){
            throw new AppError('Video session has expired', 400);
        }

        const isPatient = appointment.patientId.toString() === userId;

        let isDoctor = false;

        if(role === 'DOCTOR'){
            const doctor = await doctorRepository.findByUserId(userId);
            isDoctor = Boolean(doctor && appointment.doctorId.toString() === doctor._id.toString());
        }

        if(!isPatient && !isDoctor){
            throw new AppError('Forbidden', 403);
        }

        const participantRole = isDoctor ? 'DOCTOR' : 'PATIENT';

        return videoProvider.generateToken({
            sessionId: appointment.videoSessionId,
            participant: {
                role: participantRole,
                userId,
            },
            expiresAt: tokenExpiresTime
        });
    }
}