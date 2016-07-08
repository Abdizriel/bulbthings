'use strict';

import Sequelize from 'sequelize';
import config from './env/index';

var db = {
  Sequelize,
  sequelize: new Sequelize(config.sequelize.uri, config.sequelize.options)
};

db.Allocation = db.sequelize.import('../api/allocation/allocation.model');

module.exports = db;
