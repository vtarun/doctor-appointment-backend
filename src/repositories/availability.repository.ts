import { ClientSession } from "mongoose";
import { AvailabilityModel } from "../models/availability.model";

export const availabilitRepository = {
    async createAvailability(data: {doctorId: string, startTime: Date, endTime: Date}){
        return AvailabilityModel.create(data);
    },

    async getAvailability(doctorId: string, session?: ClientSession){
        const query = AvailabilityModel.find({doctorId, startTime: {$gte: new Date()}}).sort({startTime: 1}).lean();

        if(session) query.session(session);

        return query.exec();
    },

    async createBulkAvailability(data: Array<{doctorId: string, startTime: Date, endTime: Date}>){
        return AvailabilityModel.insertMany(data, {ordered: true});
    }
}