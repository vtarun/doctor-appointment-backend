import mongoose from "mongoose";

const subscriptionAllocationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    plan: {
        type: String,
        enum: ['free_user', 'standard', 'premium'],
        required: true
    },
    monthKey: {
        type: String,
        required: true
    },
    creditAllocated: {
        type: Number,
        required: true,
        min: 0
    }
}, { timestamps: true });

subscriptionAllocationSchema.index(
    {userId: 1, monthKey: 1},
    {unique: true}
);

export const SubscriptionAllocationModel = mongoose.model('SubscriptionAllocation', subscriptionAllocationSchema);