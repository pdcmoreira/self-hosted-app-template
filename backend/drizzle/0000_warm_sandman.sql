CREATE TABLE `logs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` text DEFAULT (datetime('now')) NOT NULL,
	`level` text NOT NULL,
	`source` text,
	`message` text NOT NULL,
	`meta` text
);
--> statement-breakpoint
CREATE INDEX `idx_logs_created_at` ON `logs` (`created_at`);--> statement-breakpoint
CREATE INDEX `idx_logs_level` ON `logs` (`level`);--> statement-breakpoint
CREATE INDEX `idx_logs_source` ON `logs` (`source`);