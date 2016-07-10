/**
 * Sequelize initialization module
 */

'use strict';

import config from '../config/environment';
import Sequelize from 'sequelize';

let db = {
  Sequelize,
  sequelize: new Sequelize(config.sequelize.uri, config.sequelize.options)
};

db.User = db.sequelize.import('../api/user/user.model');
db.Asset = db.sequelize.import('../api/asset/asset.model');
db.Type = db.sequelize.import('../api/type/type.model');
db.Allocation = db.sequelize.import('../api/allocation/allocation.model');

module.exports = db;
