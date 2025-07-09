import type { Router as RouterType } from 'express';
import { Router, Request, Response } from 'express';
import { respondSuccess } from '@/api/utils/response';
import type { HealthData } from '@shared/types/health';

const router: RouterType = Router();

router.get('/health', (req: Request, res: Response) => {
  return respondSuccess<HealthData>(res, {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    service: 'self-hosted-app-template',
  });
});

export default router;
