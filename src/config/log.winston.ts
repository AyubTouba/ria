const Winston = require('winston');
import * as config  from "config";


export const logger = Winston.createLogger({
  level: 'info',
  format: Winston.format.json(),
  defaultMeta: { service: 'web-tracker' },
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new Winston.transports.File({ filename:  config.get("Logs.error_log"), level: 'error' }),
    new Winston.transports.File({ filename:  config.get("Logs.info_log"), level: 'info' }),
   
  ],


});

Winston.addColors({
  error: 'red',
  warn: 'yellow',
  info: 'blue',
  debug: 'green'
});
//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.APP_ENVIRENMENT == 'development') {
  logger.add(new Winston.transports.Console({
    format: Winston.format.combine(
      Winston.format.colorize(),
      Winston.format.simple()
    )
  }));
}