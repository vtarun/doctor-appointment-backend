import { userRepository } from '../repositories/user.repository';
import { AppError } from '../utils/appError';

export const userService = {
	async getById(id: string) {
		const user = await userRepository.findById(id);
		
		if(!user){
			throw new AppError('User not found', 404);
		}

		return user;
	}
}