'use strict';

export default function (sequelize, DataTypes) {
  const Allocation = sequelize.define('Allocation', {

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
     * Validate Instance
     */
    validate: {
      allocationTime: function() {
        if (this.allocatedFrom >= this.allocatedTo) {
          return Promise.reject('allocatedFrom is more or equal allocatedTo');
        }

        if (this.allocatedTo <= this.allocatedFrom) {
          return Promise.reject('allocatedTo is more or equal allocatedFrom');
        }

      }
    }
  }, {

    /**
     * Virtual Getters
     */
    getterMethods: {
      /**
       *
       */
      allocation: function() {
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
      beforeCreate: value => {
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
        return Allocation.find({
          where: {
            AssetId: value.AssetId,
            allocatedFrom: { $lte: new Date(value.allocatedTo) },
            allocatedTo: { $gte: new Date(value.allocatedFrom) }
          }
        })
          .then(allocation => {
            console.log(allocation.allocatedFrom)
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
