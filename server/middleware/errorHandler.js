const logger = require('../logger');

// eslint-disable-next-line no-unused-vars
module.exports = async (err, req, res, next) => {
  const { status, errno, message } = err;
  res.locals.error = errno;
  logger.error(message || err);
  res.status(status || 500).send({ errno });
};
