"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      User.hasMany(models.Request, {
        foreignKey: "recipientId",
        as: "recipientData",
      });
      User.hasMany(models.Booking, {
        foreignKey: "donorId",
        as: "donorData",
      });
      User.hasMany(models.Schedule, {
        foreignKey: "hospitalId",
        as: "hospitalDataSchedule",
      });
      User.hasMany(models.Event, {
        foreignKey: "hospitalId",
        as: "hospitalDataEvent",
      });
      User.hasOne(models.Reward, { foreignKey: "donorId" });
      User.hasOne(models.Badge, { foreignKey: "donorId" });
      User.belongsTo(models.Allcode, {
        foreignKey: "roleId",
        targetKey: "keyMap",
        as: "roleData",
      });
      User.belongsTo(models.Allcode, {
        foreignKey: "gender",
        targetKey: "keyMap",
        as: "genderData",
      });
      User.belongsTo(models.Allcode, {
        foreignKey: "groupBlood",
        targetKey: "keyMap",
        as: "groupBloodData",
      });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      roleId: DataTypes.STRING, //allcode
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      hospitalName: DataTypes.STRING,
      gender: DataTypes.STRING, //allcode
      birthday: DataTypes.STRING,
      ward: DataTypes.STRING,
      district: DataTypes.STRING,
      city: DataTypes.STRING,
      address: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      image: DataTypes.BLOB("long"),
      groupBlood: DataTypes.STRING, //allcode
      numberOfDonation: DataTypes.INTEGER,
      status: DataTypes.STRING,
      tokenPassword: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
