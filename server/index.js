const express = require('express');
const http = require('http');

const expressConfig = require('./config/express');

const logger = require('./logger');

async function startServer() {
  const app = express();
  const port = process.env.SERVER_PORT;
  const ip = process.env.SERVER_IP;

  app.set('port', port);
  const server = http.createServer(app);

  await expressConfig({ app });

  server.listen(port, ip);
  server.on('error', (err) => {
    if (err) {
      logger.error(err);
    }
  });

  server.on('listening', () => {
    logger.info(`Your server is ready @ http://${ip}:${port}`);
  });
}

startServer();
