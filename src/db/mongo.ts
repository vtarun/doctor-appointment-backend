import mongoose from 'mongoose';
import { MONGO_URI } from '../config/env';

export async function connectMongo() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Mongo connected');
    } catch(err) {
        console.error('Mongo connection failed', err);
        process.exit(1);
    }
}