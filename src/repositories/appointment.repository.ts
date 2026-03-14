import { AppointmentModel } from "../models/appointment.model";

export const appointmentRepository = {
    async createAppointment(data: {doctorId: string, patientId: string, startTime: Date, endTime: Date}){
        return AppointmentModel.create(data);
    },

    async findById(id: string){
        return AppointmentModel.findById(id).lean();
    },

    async updateStatus(id: string, status : 'BOOKED' | 'COMPLETED' | 'CANCELLED'){
        return AppointmentModel.findByIdAndUpdate(id, {status}, {new : true}).lean();
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

    async findConflictAppointment(doctorId: string, startTime: Date){
        return AppointmentModel.findOne({
            doctorId, 
            startTime,
            status: { $ne: 'CANCELLED'}
        });
    }

}