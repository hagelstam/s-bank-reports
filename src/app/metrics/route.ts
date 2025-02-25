import { logger } from '@/lib/logger';
import { Registry, collectDefaultMetrics } from 'prom-client';

const register = new Registry();

register.setDefaultLabels({
  app: 's-bank-reports',
});

collectDefaultMetrics({ register });

export async function GET() {
  try {
    const metrics = await register.metrics();

    return new Response(metrics, {
      headers: {
        'Content-Type': register.contentType,
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    logger.error('Error generating metrics:', err);
    return new Response('Error generating metrics', { status: 500 });
  }
}
