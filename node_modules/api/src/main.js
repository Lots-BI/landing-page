import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import routes from './routes/index.js';
import { errorMiddleware } from './middleware/index.js';
import logger from './utils/logger.js';


const app = express();

process.on('uncaughtException', (error) => {
	logger.error('Uncaught exception:', error);
});
  
process.on('unhandledRejection', (reason, promise) => {
	logger.error('Unhandled rejection at:', promise, 'reason:', reason);
});

process.on('SIGINT', async () => {
	logger.info('Interrupted');
	process.exit(0);
});

process.on('SIGTERM', async () => {
	logger.info('SIGTERM signal received');

	await new Promise(resolve => setTimeout(resolve, 3000));

	logger.info('Exiting');
	process.exit();
});

app.use(helmet());

// Custom CSP middleware to allow tracking scripts
app.use((req, res, next) => {
	const cspHeader = "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://connect.facebook.net https://stats.g.doubleclick.net https://tagmanager.google.com; default-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: https://www.google-analytics.com https://stats.g.doubleclick.net https://www.googletagmanager.com; font-src 'self' data:; connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://connect.facebook.net https://stats.g.doubleclick.net https://www.google-analytics.com/collect https://analytics.google.com; frame-src 'self' https://www.googletagmanager.com";
	res.setHeader('Content-Security-Policy', cspHeader);
	next();
});

app.use(cors({
	origin: process.env.CORS_ORIGIN,
	credentials: true,
}));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes());

app.use(errorMiddleware);

app.use((req, res) => {
	res.status(404).json({ error: 'Route not found' });
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
	logger.info(`🚀 API Server running on http://localhost:${port}`);
});

export default app;