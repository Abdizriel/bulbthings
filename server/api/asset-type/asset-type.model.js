'use strict';

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('AssetType', {

    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    attrs: DataTypes.ARRAY(DataTypes.STRING),
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
      'asset-type': () => {
        return {
          'id': this._id,
          'name': this.name,
          'attributes': this.attrs
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
