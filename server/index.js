/**
 * @description HTTP server module
 * @param http
 */
import http from 'http';

/**
 * @description Express Framework module
 * @param express
 */
import express from 'express';

/**
 * @description Configuration object
 * @param config
 */
import config from 'config/env';

/**
 * @description Database config class
 * @param DBConfig
 */
import SequalizeORM from 'config/db.conf.js';

/**
 * @description Routes config class
 * @param Routes
 */
import Routes from 'config/routes.conf.js';

/**
 * @description IApplication config class
 * @param Routes
 */
import ApplicationConfig from 'config/app.conf.js';

/**
 * @description Create application with Express Framework
 * @param app
 */
const app = express();

/**
 * @description Create application server
 * @param server
 */
const server = http.createServer(app);

/**
 * @description Configure Application
 */
ApplicationConfig.init(app);

/**
 * @description Configure Routes
 */
Routes.init(app, express.Router());

/**
 * @description Configure Database and start server
 */
SequalizeORM.sequelize.sync()
  .then(startServer)
  .catch(err => console.log(err));

/**
 * @function startServer
 * @description Start API Server
 */
function startServer () {
  server.listen(config.port, config.ip, () => {
    console.log('Express server listening on %s:%s in %s mode', config.ip, config.port, config.env);
  });
}

/**
 * @description Application object
 * @module app
 */
module.exports = app;
