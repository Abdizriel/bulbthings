'use strict';

export default function (sequelize, DataTypes) {
  const Asset = sequelize.define('Asset', {

    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUniqueName: (value, next) => {
          const query = {
            where: {
              name: value
            }
          };

          Asset.findOne(query)
            .then(asset => {
              if (asset) {
                return next('Asset already exist!');
              }
              return next();
            })
            .catch(err => {
              return next(err);
            });
        }
      }
    },
    parameters: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        isObject: (value, next) => {
          if(typeof value != 'object') return next('You must provide object');
          return next();
        }
      }
    },
    TypeId: {
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
          'name': this.name,
          'parameters': this.parameters
        };
      }
    },

    /**
     * Pre-save hooks
     */
    hooks: {
      beforeValidate: asset => {
        asset.name = asset.name.charAt(0).toUpperCase() + asset.name.slice(1);
      },
      afterUpdate: asset => {
        asset.updatedAt = new Date();
        asset.save();
      }
    }
  });

  return Asset;

};
