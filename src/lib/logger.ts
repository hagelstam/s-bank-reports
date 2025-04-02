import { IS_PROD } from '@/lib/constants';
import winston from 'winston';
const { combine, timestamp, json } = winston.format;

export const logger = winston.createLogger({
  level: IS_PROD ? 'info' : 'debug',
  format: combine(timestamp(), json()),
  transports: [new winston.transports.Console()],
});
