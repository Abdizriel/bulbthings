'use strict';

import Sequelize from 'sequelize';
import config from './env/index';

let db = {
  Sequelize,
  sequelize: new Sequelize(config.sequelize.uri, config.sequelize.options)
};

// Database Models
let User = db.sequelize.import('../api/user/user.model');
let Asset = db.sequelize.import('../api/user/asset.model');
let AssetType = db.sequelize.import('../api/asset-type/asset-type.model');
let Allocation = db.sequelize.import('../api/allocation/allocation.model');

// Database Relationship
Allocation.belongsTo(User); // Will add userId to allocation
Allocation.belongsTo(Asset); // Will add assetId to allocation

Asset.belongsTo(AssetType); // Will add assetTypeId to asset

// Add Models to Sequelize
db.User = User;
db.Asset = Asset;
db.AssetType = AssetType;
db.Allocation = Allocation;

module.exports = db;
