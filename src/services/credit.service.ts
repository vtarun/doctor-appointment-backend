import mongoose from "mongoose";
import { AppError } from "../utils/appError";
import { creditWalletRepository } from "../repositories/creditWallet.repository";
import { creditTransactionRepository } from "../repositories/creditTransaction.repository";

// TODO: create table to store CREDIT and DEBIT amount 
const APPOINTMENT_CREDIT_COST = 2;
const DOCTOR_EARNING_CREDIT = 2;

interface IBookingParams{
    patientId: string; 
    doctorId: string;
    appointmentId: string;
}

export const creditService = {
    async ensureWallet(userId: string){
        return creditWalletRepository.createIfMissing(userId);

    },

    async getTransactions(userId: string){
        return creditTransactionRepository.listByUserId(userId);
    },

    async applyBooking({patientId, doctorId, appointmentId}: IBookingParams){
        const session =  mongoose.startSession();

        try{
            (await session).startTransaction();
            const patientWallet = await creditWalletRepository.createIfMissing(patientId, session);
            const doctorWallet = await creditWalletRepository.createIfMissing(doctorId, session);

            if(patientWallet.balance < APPOINTMENT_CREDIT_COST){
                throw new AppError('Insufficient finds', 400)
            }
            const patientBalance = patientWallet.balance - APPOINTMENT_CREDIT_COST; 
            const doctorBalance = doctorWallet.balance + DOCTOR_EARNING_CREDIT; 

            await creditWalletRepository.updateBalance(patientId, patientBalance, session);
            await creditWalletRepository.updateBalance(doctorId, doctorBalance, session);

            await creditTransactionRepository.create({
                userId: patientId,
                type: 'BOOKING_DEBIT',
                amount: -APPOINTMENT_CREDIT_COST,
                balanceAfter: patientBalance,
                appointmentId
            }, session);

            await creditTransactionRepository.create({
                userId: doctorId,
                type: 'BOOKING_EARNING',
                amount: DOCTOR_EARNING_CREDIT,
                balanceAfter: doctorBalance,
                appointmentId
            }, session);

            (await session).commitTransaction();
        }catch(err){
            (await session).abortTransaction();
            throw err;
        }finally{
            (await session).endSession();
        }
    },

    async applyCancellation({patientId, doctorId, appointmentId}: IBookingParams){
        const session =  mongoose.startSession();

        try{
            (await session).startTransaction();
            const patientWallet = await creditWalletRepository.createIfMissing(patientId, session);
            const doctorWallet = await creditWalletRepository.createIfMissing(doctorId, session);

            const patientBalance = patientWallet.balance + APPOINTMENT_CREDIT_COST; 
            const doctorBalance = doctorWallet.balance - DOCTOR_EARNING_CREDIT; 

            if(doctorWallet.balance < 0){
                throw new AppError('Doctor balance can not go negative', 400);
            }
           

            await creditWalletRepository.updateBalance(patientId, patientBalance, session);
            await creditWalletRepository.updateBalance(doctorId, doctorBalance, session);

            await creditTransactionRepository.create({
                userId: patientId,
                type: 'CANCELLATION_REFUND',
                amount: APPOINTMENT_CREDIT_COST,
                balanceAfter: patientBalance,
                appointmentId
            }, session);

            await creditTransactionRepository.create({
                userId: doctorId,
                type: 'CANCELLATION_REVERSAL',
                amount: -DOCTOR_EARNING_CREDIT,
                balanceAfter: doctorBalance,
                appointmentId
            }, session);

            (await session).commitTransaction();
        }catch(err){
            (await session).abortTransaction();
            throw err;
        }finally{
            (await session).endSession();
        }
    }

}