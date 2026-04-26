import { ClientSession } from "mongoose";
import { AppointmentModel } from "../models/appointment.model";

interface IBookAppointmentParams{
    doctorId: string;
    patientId: string; 
    startTime: Date; 
    endTime: Date;
    consultationType: string;
    videoSessionId?: string;
}

export const appointmentRepository = {
    async createAppointment(data: IBookAppointmentParams, session?: ClientSession){
        const docs = await AppointmentModel.create([data], {...(session && {session})});
        return docs[0];
    },

    async findById(id: string){
        return AppointmentModel.findById(id).lean();
    },

    async updateStatus(id: string, status : 'BOOKED' | 'COMPLETED' | 'CANCELLED', session?: ClientSession){
        return AppointmentModel.findByIdAndUpdate(id, {status}, {new : true, ...(session && {session}), runValidators: true}).lean();
    },

    async updateNotes(id: string, doctorNotes: string){
        return AppointmentModel.findByIdAndUpdate(id, {doctorNotes}, {new : true}).lean();
    },

    async findDoctorAppointments(doctorId: string){
        return AppointmentModel.find({doctorId}).sort({startTime: 1}).lean();
    },

    async findPatientAppointments(patientId: string){
        return AppointmentModel.find({patientId}).sort({startTime: 1}).lean();
    },

    async findConflictAppointment(doctorId: string, startTime: Date, session?: ClientSession){
        const query = AppointmentModel.findOne({
            doctorId, 
            startTime,
            status: { $ne: 'CANCELLED'}
        });

        if(session) query.session(session);

        return query.exec();
    },

    async updateVideoSession(id: string, videoSessionId: string, session?: ClientSession){
        const query = AppointmentModel.findByIdAndUpdate(id, {videoSessionId}, {new : true}).lean();

        if(session) query.session(session);

        return query.exec();
    }

    //TODO: Implement pagination

}