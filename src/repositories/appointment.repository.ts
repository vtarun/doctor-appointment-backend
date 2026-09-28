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
        return AppointmentModel.find({patientId})
            .populate({
              path: 'doctorId',
              select: 'speciality userId',
              populate: {
                path: 'userId',
                select: 'name'
              }
            }).sort({startTime: 1}).lean();
    },

    async findConflictAppointment(doctorId: string, startTime: Date, endTime: Date, session?: ClientSession){
        const query = AppointmentModel.findOne({
            doctorId, 
            status: { $ne: 'CANCELLED'},
            startTime: { $lt: endTime },
            endTime: { $gt: startTime }
        });

        if(session) query.session(session);

        return query.exec();
    },

    async updateVideoSession(id: string, videoSessionId: string, session?: ClientSession){
        const query = AppointmentModel.findByIdAndUpdate(id, {videoSessionId}, {new : true}).lean();

        if(session) query.session(session);

        return query.exec();
    },

    async completeBookedAppointment(appointmentId: string, doctorId: string, session?: ClientSession) {
        const query = AppointmentModel.findOneAndUpdate(
            { _id: appointmentId, doctorId, status: "BOOKED" },
            { $set: { status: "COMPLETED" } },
            { new: true, runValidators: true }
        );

        if(session) query.session(session);

        return query.lean().exec();
    },

    //TODO: Implement pagination

}
