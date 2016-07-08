'use strict';

import Sequelize from 'sequelize';
import config from './env/index';

var db = {
  Sequelize,
  sequelize: new Sequelize(config.sequelize.uri, config.sequelize.options)
};

db.Asset = db.sequelize.import('../api/asset/asset.model');

module.exports = db;
