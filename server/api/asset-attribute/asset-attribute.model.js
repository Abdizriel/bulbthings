'use strict';

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Asset', {

    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    key: DataTypes.STRING,
    value: DataTypes.STRING,
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
      attribute: function() {
        return {
          'id': this._id,
          'key': this.key,
          'value': this.value
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
