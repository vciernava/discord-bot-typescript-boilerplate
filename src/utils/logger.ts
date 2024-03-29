// Create a logger with colors and timestamps
// You can use it like this:
// import { logger } from "./utils/logger";

// logger.info("Hello world!");
// logger.error("Hello world!");
// logger.warn("Hello world!");
// logger.debug("Hello world!");
// logger.verbose("Hello world!");
// logger.silly("Hello world!");
// Path: src/utils/logger.ts

import { createLogger, format, transports } from 'winston';
import { config } from 'dotenv';
import { join } from 'path';

config();

const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${level}] ${label}: ${message}`;
});

export const logger = createLogger({
  format: combine(
    label({ label: process.env.BOT_NAME }),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    myFormat
  ),
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), myFormat),
    }),
    new transports.File({
      filename: join(
        __dirname,
        '..',
        '..',
        'logs',
        `${new Date().toISOString().slice(0, 10)}.log`
      ),
    }),
  ],
});
