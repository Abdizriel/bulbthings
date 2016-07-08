'use strict';

import Sequelize from 'sequelize';
import config from './env/index';

var db = {
  Sequelize,
  sequelize: new Sequelize(config.sequelize.uri, config.sequelize.options)
};

db.AssetType = db.sequelize.import('../api/asset-type/asset-type.model');

module.exports = db;
