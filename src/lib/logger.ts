import winston from 'winston';
const { combine, timestamp, json } = winston.format;

export const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: combine(timestamp(), json()),
  transports: [new winston.transports.Console()],
});
