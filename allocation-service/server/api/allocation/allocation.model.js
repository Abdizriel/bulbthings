'use strict';

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Allocation', {

    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userId: DataTypes.INTEGER,
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
          'name': this.name
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
