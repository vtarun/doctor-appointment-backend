import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { userService } from '../services/user.service';
import { AuthRequest } from '../middlewares/requireAuth';


export const getUser = asyncHandler(async (req: Request, res: Response) => {
	const user = await userService.getById(req.params.id as string);
	res.status(200).json(user);
});

export const getme = asyncHandler(async (req: AuthRequest, res: Response) => {
	if (!req.user) {
		return res.status(401).json({ message: 'User not authenticated' });
	}
	const user = await userService.getById(req.user.userId);
	res.status(200).json(user);
})


