import mongoose from "mongoose";

const creditTransactionSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: [
            'ALLOCATE',
            'BOOKING_DEBIT',
            'BOOKING_EARNING',
            'CANCELLATION_REFUND',
            'CANCELLATION_REVERSAL',
            'PAYOUT_DEDUC'
        ],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    balanceAfter: {
        type: Number,
        required: true
    },
    appointmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment'
    },
    meta: {
        type: Object,
        default: {}
    }
}, { timestamps: true });

creditTransactionSchema.index({ userId: 1, createdAt: -1 });

export const CreditTransactionModel = mongoose.model('CreditTransaction', creditTransactionSchema);