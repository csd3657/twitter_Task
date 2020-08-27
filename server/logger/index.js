const path = require('path');
const appRoot = require('app-root-path');
const {
  createLogger, format, transports,
} = require('winston');

const {
  combine, timestamp, colorize,
} = format;

const logsPath = path.join(appRoot.path, 'logs');

const options = {
  infoFile: {
    level: 'info',
    filename: path.join(logsPath, 'info.log'),
    handleExceptions: false,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  errorFile: {
    level: 'error',
    filename: path.join(logsPath, 'error.log'),
    handleExceptions: false,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
};

const simplifyTimestamp = (time) => new Date(time).toTimeString().split(' ')[0];
// eslint-disable-next-line max-len
const formatMessage = (message) => (message instanceof Object ? JSON.stringify(message, null, 2) : message);
const logger = createLogger({
  transports: [
    new transports.File(options.infoFile),
    new transports.File(options.errorFile),
  ],
  exceptionHandlers: [
    new transports.File({ filename: path.join(logsPath, 'exception.log') }),
  ],
  format: combine(
    timestamp(),
    format.printf((log) => `[${log.level}][${simplifyTimestamp(log.timestamp)}] - ${formatMessage(log.message)}`),
  ),
  exitOnError: false, // do not exit on handled exceptions
});

logger.stream = {
  // eslint-disable-next-line no-unused-vars
  write(message, encoding) {
    logger.info(message);
  },
};

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: combine(
      colorize(),
      logger.format,
    ),
  }));
}

module.exports = logger;
