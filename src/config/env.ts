import { AppError } from "../utils/appError";

export type NodeDev = 'development' | 'test' | 'production';

function requiredENV(name: string){
    const val = process.env[name];
    if(!val){        
        throw new AppError(`${name} is required`, 500);        
    }
    return val;
}

export const PORT = Number(process.env.PORT) || 3000;
export const NODE_ENV: NodeDev = (process.env.NODE_ENV as NodeDev) || 'development';
export const MONGO_URI = requiredENV('MONGO_URI');
export const JWT_SECRET = requiredENV('JWT_SECRET');
export const BCRYPT_SALT_ROUNDS = requiredENV('BCRYPT_SALT_ROUNDS');