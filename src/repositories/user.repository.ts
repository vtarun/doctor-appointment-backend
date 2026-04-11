import { ClientSession } from "mongoose";
import { UserModel } from "../models/user.model";
import { IUser } from "../interfaces/user.interface";

export const userRepository = {
    // async findById(id: string){
    //     return UserModel.findById(id).lean();
    // },

    async findById(id: string, session?: ClientSession, useLean = true){
        const query = UserModel.findById(id);

        if(session) query.session(session);
        if(useLean) query.lean();

        return query.exec();
    },

    async updateRole(userId: string, role: string ){
        return UserModel.findByIdAndUpdate(userId, {role}, {new: true}).lean();
    },

    async updatePlan(userId: string, plan: 'free_user' | 'standard' | 'premium'){
        return UserModel.findByIdAndUpdate(userId, {plan}, {new: true}).lean();
    },

    // async update(userId: string, updateData: any, session?: ClientSession){
    //     return UserModel.findByIdAndUpdate(
    //         userId, 
    //         { $set: updateData }, 
    //         { new : true, session: session || null, runValidators: true }
    //     ).lean();
    // },

    async update(userId: string, updateData: Partial<IUser>, session?: ClientSession){
        const query = UserModel.findByIdAndUpdate(
            userId,
            { $set:  updateData},
            { new: true, runValidators: true }
        );

        if(session) query.session(session);

        return query.lean().exec();
    }
}