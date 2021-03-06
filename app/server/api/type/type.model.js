'use strict';

export default function (sequelize, DataTypes) {
  const Type = sequelize.define('Type', {

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
        isUnique: (value, next) => {
          const query = {
            where: {
              name: value
            }
          };

          Type.findOne(query)
            .then(type => {
              if (type) {
                return next('Type already exist!');
              }
              return next();
            })
            .catch(err => {
              return next(err);
            });
        }
      }
    },
    attrs: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      validate: {
        isArray: (value, next) => {
          if(!Array.isArray(value)) return next('attrs is not Array type.');
          return next();
        },
        hasItems: (value, next) => {
          if(!value.length) return next('You must provide at least one parameter.');
          return next();
        },
        hasStringItems: (value, next) => {
          value = value.filter(item => typeof item != 'string');
          if(value.length) return next('You must provide String parameters.');
          return next();
        },
        notEmpty: true
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
        Type.hasMany(models.Asset);
      }
    },
    /**
     * Hooks
     */
    hooks: {
      beforeValidate: type => {
        type.name = type.name.charAt(0).toUpperCase() + type.name.slice(1);
      },
      afterUpdate: type => {
        type.updatedAt = new Date();
        type.save();
      }
    }
  });
  return Type;
};
