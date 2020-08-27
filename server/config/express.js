const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const compression = require('compression');
const logger = require('../logger');
const searchTwitter = require('../api/routes');

const errorHandler = require('../middleware/errorHandler');
const notFoundHandler = require('../middleware/notFoundHandler');

module.exports = async ({ app }) => {
  app.use(morgan('dev', { stream: logger.stream }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(compression());

  app.get('/api/search/tweets', searchTwitter);

  app.use(errorHandler, notFoundHandler);

  logger.info('Express Initialized');
  return app;
};
