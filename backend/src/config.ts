import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env file in the root directory
dotenv.config({ path: path.join(process.cwd(), '..', '.env') });

// Database paths - configurable via environment variables
export const DB_DIR: string = process.env.DB_DIR || '/app/data';

// Resolved migrations path relative to this file's location (src/config.ts)
// This works whether running from root or from backend directory
export const MIGRATIONS_DIR: string =
  process.env.MIGRATIONS_DIR || path.join(__dirname, '../drizzle');
