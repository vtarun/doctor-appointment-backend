import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { adminPayoutService } from "../services/adminPayout.service";

export const getPendingPayouts = asyncHandler(async (req: Request, res: Response) => {
    const payouts = await adminPayoutService.listOfPendingPayouts();
    res.status(201).json(payouts);
});

export const approvePayout = asyncHandler(async (req: Request, res: Response) => {
    const payout = await adminPayoutService.approvePayout(req.params.payoutId as string, req.user!.userId);
    res.status(201).json(payout);
});