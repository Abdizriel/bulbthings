'use strict';

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Allocation', {

    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    allocationRange: DataTypes.RANGE,
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
          'allocationRange': this.allocationRange
        };
      }
    },

    /**
     * Pre-save hooks
     */
    hooks: {
      afterUpdate: user => {
        user.updatedAt = new Date();
      }
    }
  });

};
