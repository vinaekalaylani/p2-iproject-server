'use strict';
const {
  Model
} = require('sequelize');
const { hashingPassword } = require(`../helpers/bcrypt`)

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo, { foreignKey: 'UserId' })
      User.belongsToMany(models.Todo, { through: `Notes` , foreignKey: `UserId`})
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: {
          msg: `Name can't be empty`
        }
      }
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
        notEmpty: {
          msg: `Email can't be empty`
        },
        isEmail: true
      }
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: {
          msg: `Password can't be empty`
        },
        len: {
          args: [5, undefined],
          msg: 'The password must contain minimal 5 characters.'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (user) => {
        user.password = hashingPassword(user.password)
      }
    },

    sequelize,
    modelName: 'User',
  });
  return User;
};