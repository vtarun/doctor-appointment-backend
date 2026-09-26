import express from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler';

import apiRoutes from './routes';

import { requestId } from './middlewares/requestId';
import { requestLogger } from './middlewares/requestLogger';

const app = express();

app.use(requestId);
app.use(express.json());
app.use(cors());

app.get('/favicon.ico', (req, res) => res.status(204).end());

app.use(requestLogger);

app.get('/health', (req, res)=>{
	res.status(200).json({status: "ok"});
});

app.use('/api/v1', apiRoutes);


app.use((_req, _res, next)=>{
	next(new Error('Route not found.'));
});

app.use(errorHandler);

export default app;
