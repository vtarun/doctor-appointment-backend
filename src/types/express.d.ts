import 'express';
import { Role } from '../constants/roles';

declare global{
    namespace Express{
        interface Request{
            user?: {
                userId: string,                
                email: string,
                role: Role | null,
            },
            verifiedDoctorId?: string
        }
    }
}

export {};