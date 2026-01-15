import app from './app';
import { PORT } from './config/env';
import { connectMongo } from './db/mongo';

async function start(){
  await connectMongo();
  const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });

  process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down...');
    server.close();
  });

  process.on('SIGINT', () => {
    console.log('SIGINT received. Shutting down...');
    server.close();
  });

}

start();


