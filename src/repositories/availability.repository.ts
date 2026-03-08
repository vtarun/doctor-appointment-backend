import { AvailabilityModel } from "../models/availability.model";

export const availabilitRepository = {
    async createAvailability(data: {doctorId: string, startTime: Date, endTime: Date}){
        return AvailabilityModel.create(data);
    },

    async getAvailability(doctorId: string){
        return AvailabilityModel.find({doctorId, startTime: {$gte: new Date()}}).sort({startTime: 1}).lean();
    },

    async createBulkAvailability(data: Array<{doctorId: string, startTime: Date, endTime: Date}>){
        return AvailabilityModel.insertMany(data, {ordered: true});
    }
}