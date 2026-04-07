import { Types } from 'mongoose';

export interface IPayout{
    doctorId: Types.ObjectId,
    paypalEmail: string,
    status: 'PROCESSING'| 'PROCESSED' | 'REJECTED',
    creditsRequested: number,
    grossAmount: number,
    feeAmount: number,
    netAmount: number,
    processedAt:  Date,
    processedBy: Types.ObjectId
}