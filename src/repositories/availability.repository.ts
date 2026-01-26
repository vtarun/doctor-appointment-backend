import { AvailabilityModel } from "../models/availability.model";

export const availabilityRepository = {
    async createAvailability(data: {
        doctorId: string,
        startTime: Date,
        endTime: Date
    }){
        return AvailabilityModel.create(data);
    },

    async availabilityOfSlots(doctorId: string){
        return AvailabilityModel.find({doctorId}).lean();
    },

    async deleteAvailability(id: string, doctorId: string){
        return AvailabilityModel.findByIdAndDelete({_id: id, doctorId});
    }
}