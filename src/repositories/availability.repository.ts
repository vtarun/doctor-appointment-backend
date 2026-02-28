import { AvailabilityModel } from "../models/availability.model";

export const availabilitRepository = {
    async createAvailability(data: {doctorId: string, startTime: Date, endTime: Date}){
        return AvailabilityModel.create(data);
    }
}