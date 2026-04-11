import mongoose, { ClientSession } from "mongoose";
import { CreaditWalletModel } from "../models/creditWallet.model";

export const creditWalletRepository = {
    async findByUserId(userId: string, session?: ClientSession){
        return CreaditWalletModel.findOne({userId}).session(session || null);
    },
       
    //TODO: Interview prep why this approach is not optimal.
    /*
    async createIfMissing(userId: string, session: any){
        let wallet = await this.findByUserId(userId, session);
        if(!wallet){
            const docs = await CreaditWalletModel.create(
                [{userId, balance: 0}], 
                {session}
            );
            wallet = docs[0] as any;
        }

        return wallet;
    }, 
    */

    async createIfMissing(userId: string, session?: any){
        return CreaditWalletModel.findOneAndUpdate(
            { userId },
            { $setOnInsert: {userId, balance: 0} },
            {
                upsert: true,
                new: true,
                session
            }
        );
    },

    async updateBalance(userId: string, amount: number, session?: any){
        return CreaditWalletModel.findOneAndUpdate(
            { userId },
            { $inc : {balance: amount}},
            {
                new: true,
                session,
                runValidators: true
            }
        );
    },

    async deductCredits(userId: string, amount: number, session: ClientSession){
        return CreaditWalletModel.findOneAndUpdate(
            { userId, balance: { $gte: amount} }, 
            { $inc: { balance: -amount} },
            { session, new: true }
        );
    }

    //TODO: Interview prep what error we will get and why.
    // async updateBalance(userId: string, amount: number, session?: ClientSession){
    //     return CreaditWalletModel.findOneAndUpdate(
    //         { userId },
    //         { $inc : {balance: amount}},
    //         {
    //             new: true,
    //             session,
    //             runValidators: true
    //         }
    //     );
    // }
}