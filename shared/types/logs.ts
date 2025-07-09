export interface LogEntry {
  id: number;
  createdAt: string;
  level: string;
  source: string | null;
  message: string;
  meta: string | null;
}

export interface LogFilters {
  search: string;
  levels: string[];
  limit: number;
}
