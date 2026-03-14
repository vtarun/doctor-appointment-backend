import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true,
        index: true
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    startTime: {
        type: Date,
        ref: 'User',
        required: true
    },
    endTime: {
        type: Date,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['BOOKED', 'COMPLETED', 'CANCELLED'],
        default: 'BOOKED'
    },
    doctorNotes: { 
        type: String, 
        trim: true 
    }
},{ timestamps: true});

appointmentSchema.index({ doctorId: 1, startTime: 1 }, {unique: true});

export const AppointmentModel = mongoose.model('Appointment', appointmentSchema);