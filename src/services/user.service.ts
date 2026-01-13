import { AppError } from '../utils/appError';

export const userService = {
	async getById(id: string) {

		if(id !== '123'){
			throw new AppError('User not found.', 404);
		}

		return {
			id: '123',
			name: 'Test user'
		}
	}
}