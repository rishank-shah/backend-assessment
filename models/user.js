const { Model } = require('sequelize');
const bcrypt = require("bcrypt")

module.exports = (sequelize, DataTypes) => {
  class User extends Model {};
  User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
            msg: "Must be a valid email address",
        },
      },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            const salt = bcrypt.genSaltSync(12);
            const hash = bcrypt.hashSync(value, salt);
            this.setDataValue("password", hash);
        }
    },
  }, {
    sequelize,
    tableName: 'users',
  });
  return User;
};