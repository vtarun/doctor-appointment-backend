import { Request, Response } from 'express';
import { creditService } from "../services/credit.service";
import { asyncHandler } from "../utils/asyncHandler";

export const getMyCreditTransactions = asyncHandler(async (req: Request, res: Response) => {
    const transactions = await creditService.getTransactions(req.user!.userId);
    res.json(transactions);
});