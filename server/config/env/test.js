'use strict';

// Test specific configuration
// ===========================
module.exports =  {

  // PostgreSQL connection options
  sequelize: {
    uri:  process.env.SEQUELIZE_URI ||
          'postgres://mrmr:mrmr@localhost:5432/bulbthings-test',
    options: {
      logging: false,
      define: {
        timestamps: false
      }
    }
  }

};
