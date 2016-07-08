'use strict';

// Production specific configuration
// =================================
module.exports = {

  // Server IP
  ip: process.env.IP ||
      undefined,

  // Server port
  port: process.env.PORT ||
        9000,

  // PostgreSQL connection options
  sequelize: {
    uri:  process.env.SEQUELIZE_URI ||
          'postgres://postgres/bulbthings' ||
          undefined,
    options: {
      logging: false,
      define: {
        timestamps: false
      }
    }
  }

};
