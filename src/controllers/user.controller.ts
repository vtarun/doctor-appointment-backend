import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { userService } from '../services/user.service';


export const getUser = asyncHandler(async (req: Request, res: Response) => {
	const user = await userService.getById(req.params.id);
	res.status(200).json(user);
});


