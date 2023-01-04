"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Request.belongsTo(models.User, {
        foreignKey: "recipientId",
        targetKey: "id",
        as: "recipientData",
      });

      Request.belongsTo(models.Allcode, {
        foreignKey: "status",
        targetKey: "keyMap",
        as: "statusData",
      });
      Request.belongsTo(models.Allcode, {
        foreignKey: "groupBlood",
        targetKey: "keyMap",
        as: "groupBloodData",
      });
    }
  }
  Request.init(
    {
      recipientId: DataTypes.INTEGER,
      donorId: DataTypes.INTEGER,
      groupBlood: DataTypes.STRING,
      unitRequire: DataTypes.INTEGER,
      offerBenefit: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Request",
    }
  );
  return Request;
};
