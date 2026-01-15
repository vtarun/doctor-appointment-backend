export type NodeDev = 'development' | 'test' | 'production';

export const PORT = Number(process.env.PORT) || 3000;
export const NODE_ENV: NodeDev = (process.env.NODE_ENV as NodeDev) || 'development';
export const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/doctor_app';