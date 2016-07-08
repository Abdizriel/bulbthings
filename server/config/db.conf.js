'use strict';

import Sequelize from 'sequelize';
import config from './env/index';

var db = {
  Sequelize,
  sequelize: new Sequelize(config.sequelize.uri, config.sequelize.options)
};

db.User = db.sequelize.import('../api/user/user.model');
db.Asset = db.sequelize.import('../api/asset/asset.model');
db.AssetType = db.sequelize.import('../api/asset-type/asset-type.model');
db.AssetAttribute = db.sequelize.import('../api/asset-attribute/asset-attribute.model');
db.Allocation = db.sequelize.import('../api/allocation/allocation.model');

module.exports = db;
