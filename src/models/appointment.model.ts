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
        required: true
    },
    endTime: {
        type: Date,        
        required: true
    },
    status: {
        type: String,
        enum: ['BOOKED', 'COMPLETED', 'CANCELLED'],
        default: 'BOOKED'
    },
    consultationType: {
        type: String,
        enum: ['IN_PERSON', 'VIDEO'],
        default: 'IN_PERSON',
        required:  true
    },
    videoSessionId: {
        type: String
    },
    // videoDetails:{
    //     provider: { type: String, emun: ['STUB', 'TWILIO', 'ZOOM', 'AGORA'] },
    //     sessionId: { type: String }
    // },
    doctorNotes: { 
        type: String, 
        trim: true 
    }
},{ timestamps: true});

appointmentSchema.index({ doctorId: 1, startTime: 1 }, {unique: true});

export const AppointmentModel = mongoose.model('Appointment', appointmentSchema);