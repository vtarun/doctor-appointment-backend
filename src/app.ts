import express from 'express';
import { errorHandler } from './middlewares/errorHandler';

import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import doctorRoutes from './routes/doctor.routes';
import adminRoutes from './routes/admin.routes';
import availabilityRoutes from './routes/availability.routes';
import appointmentRoutes from './routes/apppointment.routes';
import creditRoutes from './routes/credit.routes';
import payoutRoutes from './routes/payout.routes';
import videoRoutes from './routes/video.routes';
import { requestId } from './middlewares/requestId';
import { requestLogger } from './middlewares/requestLogger';

const app = express();

app.use(requestId);
app.use(express.json());

app.get('/favicon.ico', (req, res) => res.status(204).end());

app.use(requestLogger);

app.get('/health', (req, res)=>{
	res.status(200).json({status: "ok"});
});


app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/doctors', doctorRoutes);
app.use('/admin', adminRoutes);
app.use('/availability', availabilityRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/credit', creditRoutes);
app.use('/payouts', payoutRoutes);
app.use('/video', videoRoutes);


app.use((_req, _res, next)=>{
	next(new Error('Route not found.'));
});

app.use(errorHandler);

export default app;
