import express from 'express';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());

app.get('/health', (req, res)=>{
	res.status(200).json({status: "ok"});
});

app.use((_req, _res, next)=>{
	next(new Error('Route not found.'));
});

app.use(errorHandler);

export default app;
