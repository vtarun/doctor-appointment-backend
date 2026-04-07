import mongoose, { Types, ClientSession } from "mongoose";
import { IPayout } from "../interfaces/payout.interface";
import { PayoutRequestModel } from "../models/payoutRequest.model"

type CreatePayoutDTO = Omit<IPayout, 'status'| 'processedAt'| 'processedBy'>

export const payoutRepository = {
    async create(data: CreatePayoutDTO, session?: ClientSession){
        const options : mongoose.CreateOptions = {};
        if(session) options.session = session;
        const docs = await PayoutRequestModel.create([data], options);
        return docs[0];
    },

    async findProcessingByDoctorId(doctorId: string){
        return PayoutRequestModel.findOne({doctorId, status: 'PROCESSING'}).lean();
    },

    async listByDoctorId(doctorId: string){
        return PayoutRequestModel.find({doctorId}).sort({createdAt: -1}).lean();
    },

    async listPending(){
        return PayoutRequestModel.find({status: 'PROCESSING'}).sort({createdAt: -1}).lean();
    },

    async findById(id: string){
        return PayoutRequestModel.findById(id).lean();
    },

    async updateStatus(id: string, status: 'PROCESSED' | 'REJECTED', processorId: string, session?: ClientSession){
        const updateData: Partial<IPayout> = {
            status,
            processedBy: new Types.ObjectId(processorId),
            processedAt: new Date()
        }        
        return PayoutRequestModel.findByIdAndUpdate(id, { $set: updateData }, { new: true, runValidators: true }).lean().exec();
    }
}