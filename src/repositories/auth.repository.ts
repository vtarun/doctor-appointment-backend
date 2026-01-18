import { UserModel } from "../models/user.model";


export const authRepository = {
    async findByEmail(email: string){
        return UserModel.findOne({email}).select('+passwordHash');
    },

    async createUser(data: {name: string, email: string, passwordHash: string, role?: string} ){
        return UserModel.create(data);
    }
}