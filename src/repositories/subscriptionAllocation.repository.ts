import { ClientSession } from "mongoose";
import { SubscriptionAllocationModel } from "../models/subscriptionAllocation.model";

interface ISubscriptionAllocationParams{
    userId: string;
    monthKey: string;
    plan: 'free_user'| 'standard'| 'premium';
    creditAllocated: number;
}

export const subscriptionAllocationRepository = {
    async findByUserIdAndMonth(userId: string, monthKey: string, session?: ClientSession){
        return SubscriptionAllocationModel.findOne({userId, monthKey}).session(session || null);
    },

    async create(
        data: ISubscriptionAllocationParams, 
        session?: ClientSession
    ) { 
        const docs = await SubscriptionAllocationModel.create([data], {...(session && {session})});
        return docs[0];
    }
}