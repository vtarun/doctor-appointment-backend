import app from '../app';

const PORT = process.env.PORT || 3000;

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