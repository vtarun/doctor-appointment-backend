import mongoose from 'mongoose';

const availabilitySchema = new mongoose.Schema({
    doctorId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Doctor', index: true },
    startTime: { type : Date, required: true },
    endTime: { type : Date, required: true },
}, { timestamps: true});

// prevent duplicate overlapping exact windows
availabilitySchema.index(
  { doctorId: 1, startTime: 1, endTime: 1 },
  { unique: true }
);

export const AvailabilityModel = mongoose.model('Availability', availabilitySchema);