"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Allcode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association
      Allcode.hasMany(models.User, {
        foreignKey: "roleId",
        as: "roleData",
      });
      Allcode.hasMany(models.User, {
        foreignKey: "gender",
        as: "genderData",
      });
      Allcode.hasMany(models.User, {
        foreignKey: "groupBlood",
        as: "groupBloodDataUser",
      });
      Allcode.hasMany(models.Request, {
        foreignKey: "groupBlood",
        as: "groupBloodDataRequest",
      });
      Allcode.hasMany(models.Request, {
        foreignKey: "status",
        as: "statusDataRequest",
      });
      Allcode.hasMany(models.Booking, {
        foreignKey: "timeType",
        as: "timeTypeDataDonor",
      });
      Allcode.hasMany(models.Booking, {
        foreignKey: "status",
        as: "statusDataBooking",
      });
      Allcode.hasMany(models.Schedule, {
        foreignKey: "timeType",
        as: "timeTypeData",
      });
    }
  }
  Allcode.init(
    {
      keyMap: DataTypes.STRING,
      type: DataTypes.STRING,
      valueEn: DataTypes.STRING,
      valueVi: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Allcode",
    }
  );
  return Allcode;
};
