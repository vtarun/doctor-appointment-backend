import express from 'express';
import { errorHandler } from './middlewares/errorHandler';

import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import doctorRoutes from './routes/doctor.routes';
import adminRoutes from './routes/admin.routes';

const app = express();

app.use(express.json());

app.get('/health', (req, res)=>{
	res.status(200).json({status: "ok"});
});

app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/doctors', doctorRoutes);
app.use('/admin', adminRoutes);


app.use((_req, _res, next)=>{
	next(new Error('Route not found.'));
});

app.use(errorHandler);

export default app;
