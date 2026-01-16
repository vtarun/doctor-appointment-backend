import { UserModel } from "../models/user.model";

export const userRepository = {
    async findById(id: string){
        return UserModel.findById(id).lean();
    }
}