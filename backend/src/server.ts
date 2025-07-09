import express, { Express } from 'express';
import { setupApi } from './api';
import { setupStaticFiles, setupSpaCatchAll } from './core';
import { runMigrations } from './db/migrate';
import { logger } from './services/logger';

// Prevent server crash on unhandled promise rejections
process.on('unhandledRejection', (reason) => {
  logger.error(`Unhandled Rejection: ${reason}`);
});

// Initialize database on startup
runMigrations();

const app: Express = express();

const PORT = parseInt(process.env.PORT || '3000');

// Setup API (middlewares + routes + error handler)
setupApi(app);

// Setup static file serving
setupStaticFiles(app);

// Setup SPA catch-all (must be last)
setupSpaCatchAll(app);

// Start server
app.listen(PORT, '0.0.0.0', () => {
  logger.debug(`Server running on port ${PORT}`);

  console.log(`Server running on port ${PORT}`);
});

export default app;
