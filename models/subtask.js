"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SubTask extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Task }) {
      // define association here
      this.belongsTo(Task, {
        foreignKey: { name: "taskId", allowNull: false },
        hooks: true,
        onDelete: "CASCADE",
        targetKey: "id",
      });
    }
  }
  SubTask.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: null,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: null,
      },
      isDone: {
        type: DataTypes.BOOLEAN,
        allowNull: null,
        defaultValue: false,
      },
      isPriority: {
        type: DataTypes.BOOLEAN,
        allowNull: null,
        defaultValue: false,
      },
      taskId: {
        type: DataTypes.UUID,
        allowNull: null,
      },
    },
    {
      sequelize,
      modelName: "SubTask",
      tableName: "subTasks",
    }
  );
  return SubTask;
};
