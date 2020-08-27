const logger = require('../logger');

module.exports = async (req, res) => {
  logger.error('Page not found');
  res.status(404).send('Page not found');
};
