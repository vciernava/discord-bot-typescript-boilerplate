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

import { createLogger, format, transports } from "winston";
import { config } from "dotenv";
import { join } from "path";

config();

const { combine, timestamp, label, printf, colorize } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

export const logger = createLogger({
  format: combine(
    colorize(),
    label({ label: process.env.BOT_NAME }),
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    myFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: join(__dirname, "..", "..", "logs", "combined.log") })
  ]
});
