import { api } from './api'
import type { ApiResponse } from '@shared/types/api'
import type { LogEntry, LogFilters } from '@shared/types/logs'

export const logsService = {
  async getLogs(filters: LogFilters): Promise<LogEntry[]> {
    const response = await api.get<ApiResponse<LogEntry[]>>('/api/logs', {
      params: {
        search: filters.search,
        levels: filters.levels,
        limit: filters.limit,
      },
    })

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error || 'Failed to fetch logs')
    }

    return response.data.data
  },

  async clearLogs(): Promise<void> {
    const response = await api.post<ApiResponse>('/api/clear-log')

    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to clear logs')
    }
  },
}
