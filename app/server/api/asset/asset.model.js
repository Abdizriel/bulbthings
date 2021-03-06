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
        notEmpty: true,
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
     * Relationship
     */
    classMethods: {
      associate: models => {
        Asset.belongsTo(models.Type, { onDelete: 'cascade', hooks:true });
        Asset.belongsToMany(models.User, {
          through: {
            model: models.Allocation
          },
          foreignKey: 'AssetId',
          constraints: false,
          onDelete: 'cascade'
        });
      }
    },
    /**
     * Hooks
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
