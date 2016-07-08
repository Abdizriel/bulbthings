'use strict';

// Development specific configuration
// ==================================
module.exports = {

  // PostgreSQL connection options
  sequelize: {
    uri: 'postgres://mrmr:mrmr@localhost:5432/bulbthings-dev',
    options: {
      logging: false,
      define: {
        timestamps: false
      }
    }
  }

};
