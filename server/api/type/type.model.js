'use strict';

module.exports = (sequelize, DataTypes) => {
  const Type = sequelize.define('Type', {

    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      validate: {
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
      type: DataTypes.ARRAY(DataTypes.STRING)
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
      type: function() {
        return {
          'id': this._id,
          'name': this.name,
          'attrs': this.attrs
        };
      }
    },

    /**
     * Pre-save hooks
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
