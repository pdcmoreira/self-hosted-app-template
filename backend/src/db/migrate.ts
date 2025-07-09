import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { db, initializeFts } from './index';
import { MIGRATIONS_DIR } from '../config';

export function runMigrations() {
  console.log('Initializing database...');

  try {
    // Run migrations to create tables
    migrate(db, { migrationsFolder: MIGRATIONS_DIR });

    // Initialize FTS for fast log search
    initializeFts();

    console.log('Database ready');
  } catch (error) {
    console.error('Database initialization failed:', error);

    throw error;
  }
}
