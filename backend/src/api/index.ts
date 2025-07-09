import { Express, Request, Response, json, urlencoded } from 'express';
import cors from 'cors';
import { respondError } from './utils/response';
import healthRoutes from './routes/health';
import logsRoutes from './routes/logs';

export const setupApi = (app: Express): void => {
  // Middlewares

  app.use(cors());

  app.use(json());

  app.use(urlencoded({ extended: true }));

  // Routes

  app.use(healthRoutes);

  app.use('/api', logsRoutes);

  // Global error handler - catches all unhandled exceptions
  app.use((err: Error, req: Request, res: Response) => {
    respondError(res, err.message || 'Internal server error');
  });
};
