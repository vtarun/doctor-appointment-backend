import mongoose from "mongoose";
import { creditWalletRepository } from "../repositories/creditWallet.repository";
import { doctorRepository } from "../repositories/doctor.respository"
import { payoutRepository } from "../repositories/payout.repository"
import { AppError } from "../utils/appError";


const CREDIT_TO_MONEY_RATE = 10;
const PLATFORM_FEE_PER_CREDIT = 2;
const DOCTOR_NET_PER_CREDIT = CREDIT_TO_MONEY_RATE - PLATFORM_FEE_PER_CREDIT;

export const payoutService = {
    async requestPayout(userId: string, data: { paypalEmail: string, creditsRequested: number}){
        const doctor = await doctorRepository.findByUserId(userId);

        if(!doctor){
            throw new AppError('Doctor profile not found', 404);
        }

        const session = await mongoose.startSession();
        session.startTransaction();
        try{

            const existingProcessing = await payoutRepository.findProcessingByDoctorId(doctor._id.toString());

            if(existingProcessing){
                throw new AppError('A payout request is already in progressing', 400);
            }

            if(data.creditsRequested < 1){
                throw new AppError('Credits requested must be at least 1', 400);
            }

            const wallet = await creditWalletRepository.deductCredits(userId, data.creditsRequested, session);

            if(!wallet){
                throw new AppError('Insufficient available credits for payout', 400);
            }

            const grossAmount = data.creditsRequested * CREDIT_TO_MONEY_RATE;
            const feeAmount = data.creditsRequested * PLATFORM_FEE_PER_CREDIT;
            const netAmount =  data.creditsRequested * DOCTOR_NET_PER_CREDIT;

            const payout = await payoutRepository.create({
                doctorId: doctor._id,
                paypalEmail: data.paypalEmail,
                creditsRequested: data.creditsRequested,
                grossAmount,
                feeAmount,
                netAmount
            }, session);

            await session.commitTransaction();
            return payout;

        }catch(err){
            await session.abortTransaction();
            throw err;
        }finally{
            session.endSession();
        }
    },

    async getDoctorEarningsSummary(userId: string){
        const doctor = await doctorRepository.findByUserId(userId);

        if(!doctor){
            throw new AppError('Doctor profile not found', 404);
        }

        const doctorIdStr = doctor._id.toString();

        const [wallet, processingRequest, history] = await Promise.all([
            creditWalletRepository.createIfMissing(userId),
            payoutRepository.findProcessingByDoctorId(doctorIdStr),
            payoutRepository.listByDoctorId(doctorIdStr)
        ]);
        
        return {
            availableCredits: wallet.balance,
            estimatedGrossAmount: wallet.balance * CREDIT_TO_MONEY_RATE,
            estimatedFeeAmount: wallet.balance * PLATFORM_FEE_PER_CREDIT,
            estimatedNetAmount: wallet.balance * DOCTOR_NET_PER_CREDIT,
            processingRequest,
            history
        }
    }

    //TODO: implement cancel payout request by admin
}