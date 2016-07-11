'use strict';

module.exports = (sequelize, DataTypes) => {
  const Allocation = sequelize.define('Allocation', {

    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    allocatedFrom: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    allocatedTo: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    AssetId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
        isInt: true
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
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
      allocation: function() {
        return {
          'id': this._id,
          'userId': this.UserId,
          'assetId': this.AssetId,
          'from': this.allocatedFrom,
          'to': this.allocatedTo
        };
      }
    },

    /**
     * Pre-save hooks
     */
    hooks: {
      beforeCreate: value => {
        if (value.allocatedFrom >= value.allocatedTo) {
          return Promise.reject('From is later than To');
        }

        return Allocation.findOne({
          where: {
            AssetId: value.AssetId,
            allocatedFrom: { $lt: new Date(value.allocatedTo) },
            allocatedTo: { $gt: new Date(value.allocatedFrom) }
          }
        })
          .then(allocation => {
            if(allocation) return Promise.reject('Asset is allocated in that time');
          });
      },
      beforeUpdate: value => {
        if (value.allocatedFrom >= value.allocatedTo) {
          return Promise.reject('From is later than To');
        }

        return Allocation.findAll({
          where: {
            AssetId: value.AssetId,
            allocatedFrom: { $lt: new Date(value.allocatedTo) },
            allocatedTo: { $gt: new Date(value.allocatedFrom) }
          }
        })
          .then(allocations => {
            if(allocations.length > 1) return Promise.reject('Asset is allocated in that time');

            const sameUser = value.UserId === allocations[0].UserId;
            const sameAsset = value.AssetId === allocations[0].AssetId;
            if(!sameAsset || !sameUser) return Promise.reject('Can\'t update User and Asset ID. Add new allocation');
          });
      },
      afterUpdate: allocation => {
        allocation.updatedAt = new Date();
        allocation.save();
      }
    }
  });
  return Allocation;
};
