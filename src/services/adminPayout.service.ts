import mongoose from "mongoose";
import { creditTransactionRepository } from "../repositories/creditTransaction.repository";
import { creditWalletRepository } from "../repositories/creditWallet.repository";
import { doctorRepository } from "../repositories/doctor.respository";
import { payoutRepository } from "../repositories/payout.repository";
import { AppError } from "../utils/appError";

export const adminPayoutService = {
    async listOfPendingPayouts(){
        return payoutRepository.listPending();
    },

    async approvePayout(payoutId: string, adminUserId: string){
        const session = await mongoose.startSession();
        try{
            session.startTransaction();
            const payout = await payoutRepository.findById(payoutId, session);

            if(!payout){
                throw new AppError('Payout request not found', 400);
            }

            if(payout.status !== 'PROCESSING'){
                throw new AppError('Payout request is not pending', 400);
            }

            const doctor = await doctorRepository.findById(payout.doctorId.toString(), session);

            if(!doctor){
                throw new AppError('Doctor not found', 404);
            }
            const doctorUserId = doctor.userId.toString();
            const wallet = await creditWalletRepository.findByUserId(doctorUserId, session);
            
           
            await creditTransactionRepository.create({
                userId: doctorUserId,
                type: 'PAYOUT_DEDUC',
                amount: -payout.creditsRequested,
                balanceAfter: wallet!.balance,
                meta: {
                    payoutId,
                    grossAmount: payout.grossAmount,
                    feeAmount: payout.feeAmount,
                    netAmount: payout.netAmount
                }
            }, session);

            const updatedPayout = await payoutRepository.updateStatus(payoutId, 'PROCESSED', adminUserId, session);
            await session.commitTransaction();
            return updatedPayout;
        }catch(err){
            await session.abortTransaction();
            throw err;
        }finally{
            session.endSession();
        }
    }
}