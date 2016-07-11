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
            allocatedFrom: { $lte: new Date(value.allocatedTo) },
            allocatedTo: { $gte: new Date(value.allocatedFrom) }
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

        return Allocation.find({
          where: {
            AssetId: value.AssetId,
            allocatedFrom: { $lte: new Date(value.allocatedTo) },
            allocatedTo: { $gte: new Date(value.allocatedFrom) }
          }
        })
          .then(allocation => {
            // Check if asset is modified for the same user
            console.log(allocation)
            if(value.UserId === allocation.UserId) {

              // If asset time is shorted for asset allow that operation
              if(
                value.allocatedFrom >= allocation.allocatedFrom
                  &&
                value.allocatedTo <= allocation.allocatedTo
              ) return Promise.resolve();

            }

            // Otherwise reject
            if(allocation) return Promise.reject('Asset is allocated in that time');
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
