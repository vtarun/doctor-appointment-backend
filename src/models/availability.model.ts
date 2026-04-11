import mongoose from "mongoose"

const availabilitySchema = new mongoose.Schema({
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', require: true, index: true},
    startTime: { type: Date, require: true},
    endTime: { type: Date, require: true},
}, {timestamps: true});

availabilitySchema.index(
  { doctorId: 1, startTime: 1, endTime: 1 },
  { unique: true }
);


export const AvailabilityModel = mongoose.model('Availability', availabilitySchema)