"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event.belongsTo(models.User, {
        foreignKey: "hospitalId",
        targetKey: "id",
        as: "hospitalData",
      });
    }
  }
  Event.init(
    {
      hospitalId: DataTypes.INTEGER,
      location: DataTypes.STRING,
      date: DataTypes.STRING,
      description: DataTypes.STRING,
      nameEvent: DataTypes.STRING,
      eventImage: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Event",
    }
  );
  return Event;
};
