import { CreditTransactionModel } from "../models/creditTransaction.model";

export const creditTransactionRepository = {
    async create(data: any, session: any){
        return CreditTransactionModel.create([data], {session}).then(docs => docs[0]);
    },

    async listByUserId(userId: string){
        return CreditTransactionModel.find({userId}).sort({ createdAt: -1}).lean();
    }
}