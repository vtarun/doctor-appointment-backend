import { UserModel } from "../models/user.model";

export const userRepository = {
    async findById(id: string){
        return UserModel.findById(id).lean();
    },

    async updateRole(userId: string, role: string ){
        return UserModel.findByIdAndUpdate(userId, {role}, {new: true}).lean();
    }
}