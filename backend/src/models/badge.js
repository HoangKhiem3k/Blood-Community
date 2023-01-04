"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Badge extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Badge.belongsTo(models.User, {
        foreignKey: "donorId",
      });
    }
  }
  Badge.init(
    {
      donorId: DataTypes.INTEGER,
      imageBadge: DataTypes.BLOB("long"),
    },
    {
      sequelize,
      modelName: "Badge",
      freezeTableName: true,
    }
  );
  return Badge;
};
