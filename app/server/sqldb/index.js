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

// Insert models below
let User = db.sequelize.import('../api/user/user.model');
let Asset = db.sequelize.import('../api/asset/asset.model');
let Type = db.sequelize.import('../api/type/type.model');
let Allocation = db.sequelize.import('../api/allocation/allocation.model');

// Database Relationship
Allocation.belongsTo(User); // Will add userId to allocation
Allocation.belongsTo(Asset); // Will add assetId to allocation

Asset.belongsTo(Type); // Will add assetId to allocation

// Add Models to Sequelize
db.User = User;
db.Asset = Asset;
db.Type = Type;
db.Allocation = Allocation;

module.exports = db;
