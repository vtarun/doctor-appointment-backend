import { AppointmentModel } from "../models/appointment.model";

export const appointmentRepository = {
    async createAppointment(data: {doctorId: string, patientId: string, startTime: Date, endTime: Date}){
        return AppointmentModel.create(data);
    },

    async findDoctorAppointments(doctorId: string,){
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