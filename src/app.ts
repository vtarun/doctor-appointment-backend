import express from 'express';
import { errorHandler } from './middlewares/errorHandler';

import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';

const app = express();

app.use(express.json());

app.get('/health', (req, res)=>{
	res.status(200).json({status: "ok"});
});

app.use('/users', userRoutes);
app.use('/auth', authRoutes);

app.use((_req, _res, next)=>{
	next(new Error('Route not found.'));
});

app.use(errorHandler);

export default app;
