'use strict';

export default function (sequelize, DataTypes) {
  const User =  sequelize.define('User', {

    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        msg: 'The specified email address is already in use.'
      },
      validate: {
        isEmail: true
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
        
        User.hasMany(models.Allocation);
      }
    },
    /**
     * Hooks
     */
    hooks: {
      afterUpdate: user => {
        user.updatedAt = new Date();
        user.save();
      }
    }
  });
  return User;
};
