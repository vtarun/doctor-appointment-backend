import mongoose, { ClientSession } from "mongoose";
import { AppError } from "../utils/appError";
import { creditWalletRepository } from "../repositories/creditWallet.repository";
import { creditTransactionRepository } from "../repositories/creditTransaction.repository";
import { userRepository } from "../repositories/user.repository";
import { subscriptionAllocationRepository } from "../repositories/subscriptionAllocation.repository";

// TODO: create table to store CREDIT and DEBIT amount 
const APPOINTMENT_CREDIT_COST = 2;
const DOCTOR_EARNING_CREDIT = 2;

interface IBookingParams{
    patientId: string; 
    doctorId: string;
    appointmentId: string;
}

const PLAN_CREDITS: Record<'free_user' | 'standard' | 'premium', number> = {
    free_user: 0,
    standard: 10,
    premium: 24
};

function getMonthKey(date: Date = new Date()): string{
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
}

export const creditService = {
    async ensureWallet(userId: string){
        return creditWalletRepository.createIfMissing(userId);

    },

    async getTransactions(userId: string){
        return creditTransactionRepository.listByUserId(userId);
    },

    async getWallet(userId: string){
        return creditWalletRepository.createIfMissing(userId);
    },

    async allocateMonthlyCredits(userId: string, session?: ClientSession){
       const monthKey = getMonthKey();
       const user = await userRepository.findById(userId);

        if(!user)  throw new AppError('User not found', 404);
        
        const existing = await subscriptionAllocationRepository.findByUserIdAndMonth(userId, monthKey);

        if(existing){
            return {
                allocated: false,
                reason: 'ALready allocated for this month',
                monthKey
            }
        }

        const executeLogic = async (activeSession: ClientSession) => {
            const credits = PLAN_CREDITS[user.plan] ?? 0;

            const wallet = await creditWalletRepository.createIfMissing(userId, activeSession);

            const nextBalance = wallet.balance + credits;

            await creditTransactionRepository.create({
                userId,
                type: 'ALLOCATE',
                amount: credits,
                balanceAfter: nextBalance,
                meta: {
                    monthKey,
                    plan: user.plan
                }
            }, activeSession);

            await subscriptionAllocationRepository.create({
                userId,
                plan: user.plan,
                monthKey,
                creditAllocated: credits
            }, activeSession);

            return {
                allocated: true,
                monthKey,
                credits,
                balanceAfter: nextBalance
            };
        }

        if(session){
            return await executeLogic(session);;
        }else{
            const newSession = await mongoose.startSession();
            try{
                return await newSession.withTransaction(() => executeLogic(newSession));
            }finally{
                newSession.endSession();
            }
        }    
    },

    async applyBooking({patientId, doctorId, appointmentId}: IBookingParams, existingSession?: ClientSession){
        const session = existingSession || await mongoose.startSession();
        const isLocalSession = !existingSession;
        try{
            if(isLocalSession) {
                session.startTransaction();
            }
            const patientWallet = await creditWalletRepository.createIfMissing(patientId, session);
            const doctorWallet = await creditWalletRepository.createIfMissing(doctorId, session);

            if(patientWallet.balance < APPOINTMENT_CREDIT_COST){
                throw new AppError('Insufficient finds', 400)
            }
            const patientBalance = patientWallet.balance - APPOINTMENT_CREDIT_COST; 
            const doctorBalance = doctorWallet.balance + DOCTOR_EARNING_CREDIT; 

            await creditWalletRepository.updateBalance(patientId, -APPOINTMENT_CREDIT_COST, session);
            await creditWalletRepository.updateBalance(doctorId, DOCTOR_EARNING_CREDIT, session);

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
            if(isLocalSession) {
                (await session).commitTransaction();
            }
        }catch(err){
            if(isLocalSession) {
                (await session).abortTransaction();
            }
            throw err;
        }finally{
            if(isLocalSession) {
                (await session).endSession();
            }
        }
    },

    async applyCancellation({patientId, doctorId, appointmentId}: IBookingParams, existingSession: ClientSession){
        const session = existingSession || await mongoose.startSession();
        const isLocalSession = !existingSession;
        try{
            if(isLocalSession){
                session.startTransaction();
            }
            
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

            if(isLocalSession){
                await session.commitTransaction();
            }
            
        }catch(err){
            if(isLocalSession){
                await session.abortTransaction();
            }
            throw err;
        }finally{
            if(isLocalSession){
                session.endSession();
            }
        }
    }

}