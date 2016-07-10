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

// Will add UserId to Allocation
User.hasMany(Allocation);
Allocation.belongsTo(User);

// Will add AssetId to Allocation
Asset.hasMany(Allocation);
Allocation.belongsTo(Asset);

// Will add TypeId to Asset
Type.hasMany(Asset);
Asset.belongsTo(Type);

// Add Models to Sequelize
db.User = User;
db.Asset = Asset;
db.Type = Type;
db.Allocation = Allocation;

module.exports = db;
