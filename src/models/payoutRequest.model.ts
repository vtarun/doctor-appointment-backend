import mongoose from "mongoose";
import { IPayout } from "../interfaces/payout.interface";

const payoutRequestSchema = new mongoose.Schema<IPayout>({
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', index: true, required: true },
    paypalEmail: { type: String, required: true, trim: true, lowercase: true},
    status: { type: String, enum: ['PROCESSING', 'PROCESSED','REJECTED'], default: 'PROCESSING', index: true},
    creditsRequested: { type: Number, required: true, min: 1},
    grossAmount: { type: Number, required: true, min: 0 },
    feeAmount: { type: Number, required: true, min: 0 },
    netAmount: { type: Number, required: true, min: 0 },
    processedAt: { type: Date },
    processedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true});

payoutRequestSchema.index(
    {doctorId: 1, status: 1},
    { partialFilterExpression: { status: 'PROCESSING'}}
);

export const PayoutRequestModel = mongoose.model<IPayout>('PayoutRequest', payoutRequestSchema);