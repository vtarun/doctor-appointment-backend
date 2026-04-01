import { Request, Response } from 'express';
import { creditService } from "../services/credit.service";
import { asyncHandler } from "../utils/asyncHandler";

export const getMyCreditTransactions = asyncHandler(async (req: Request, res: Response) => {
    const transactions = await creditService.getTransactions(req.user!.userId);
    res.json(transactions);
});

export const getMyWallet = asyncHandler(async (req: Request, res: Response) => {
    const wallet = await creditService.getWallet(req.user!.userId);
    return res.json(wallet);
});

export const allocateMonthlyCredits = asyncHandler(async (req: Request, res: Response) => {
    const result = await creditService.allocateMonthlyCredits(req.user!.userId);
    return res.json(result);
});