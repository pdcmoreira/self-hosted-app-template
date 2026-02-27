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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- Express requires 4 params (err, req, res, next) to identify this as an error handler
  app.use((err: Error, req: Request, res: Response, next: () => void) => {
    respondError(res, err.message || 'Internal server error');
  });
};
