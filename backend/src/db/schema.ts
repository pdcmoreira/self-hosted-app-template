import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text, index } from 'drizzle-orm/sqlite-core';

export const logs = sqliteTable(
  'logs',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    createdAt: text('created_at')
      .notNull()
      .default(sql`(datetime('now'))`),
    level: text('level', {
      enum: ['info', 'warn', 'error', 'debug'],
    }).notNull(),
    source: text('source'),
    message: text('message').notNull(),
    meta: text('meta'), // JSON string for extra fields
  },
  (table) => [
    index('idx_logs_created_at').on(table.createdAt),
    index('idx_logs_level').on(table.level),
    index('idx_logs_source').on(table.source),
  ]
);

export type Log = typeof logs.$inferSelect;

export type NewLog = typeof logs.$inferInsert;
