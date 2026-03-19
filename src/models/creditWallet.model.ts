import mongoose from 'mongoose';

const creditWalletSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
        index: true
    },
    balance: {
        type: Number,
        require: true,
        min: 0,
        default: 0
    }
}, { timestamps: true});

export const CreaditWalletModel = mongoose.model('CreditWallet', creditWalletSchema); 