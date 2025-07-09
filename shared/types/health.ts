export interface HealthData {
  status: 'healthy' | 'unhealthy';
  timestamp: string;
  uptime: number;
  service: string;
}
