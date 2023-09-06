import { defineMiddleware } from "astro:middleware";
import { createLogger, transports, format } from "winston";

export type Logger = typeof logger;

export const logger = createLogger({
  transports: [
    new transports.File({
      filename: 'combined.log',
      level: 'info'
    }),
    new transports.File({
      filename: 'errors.log',
      level: 'error'
    }),
    new transports.Console()],
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.simple(),
  }));
}

export const provideLogger = defineMiddleware(({locals, request}, next) => {
  logger.info(`Loading ${request.url}`)

  locals.logger = logger

  return next();
});