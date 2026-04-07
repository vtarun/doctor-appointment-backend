import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { payoutService } from "../services/payout.service";

export const createRequestPayout = asyncHandler( async (req: Request, res: Response) => {
    const payout = await payoutService.requestPayout(req.user!.userId, req.body);

    res.status(201).json(payout);
});

export const getMyEarningsSummary = asyncHandler(async (req: Request, res: Response) => {
    const summary = await payoutService.getDoctorEarningsSummary(req.user!.userId);

    res.status(201).json(summary); 
});

//TODO: implement cancel payout request by admin