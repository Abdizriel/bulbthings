'use strict';

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Asset', {

    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    parameters: DataTypes.JSON,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: DataTypes.DATE
  }, {

    /**
     * Virtual Getters
     */
    getterMethods: {
      // Public profile information
      asset: function() {
        return {
          'id': this._id,
          'name': this.name,
          'parameters': this.parameters
        };
      }
    },

    /**
     * Pre-save hooks
     */
    hooks: {
      afterUpdate: user => {
        user.updatedAt = new Date();
        user.save();
      }
    }
  });

};
