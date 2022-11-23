const { format, createLogger, transports } = require('winston');
const { timestamp, combine, errors, json } = format;

function prodLogger() {
  return createLogger({
    format: combine(timestamp(), errors({ stack: true }), json()),
    defaultMeta: { service: 'user-service' },
    transports: [
      new transports.File({
        filename: 'info.log',
      }),
      new transports.Console(),
    ],
  });
}

module.exports = prodLogger;
