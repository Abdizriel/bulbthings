'use strict';

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Allocation', {

    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    allocatedFrom: {
      type: DataTypes.DATE,
      allowNull: false
    },
    allocatedTo: {
      type: DataTypes.DATE,
      allowNull: false
    },
    AssetId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true
      }
    },
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
