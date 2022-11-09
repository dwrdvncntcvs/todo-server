const { Schema, model } = require("mongoose");
const { cleanData } = require("../../utils/helpers");

const subTaskSchema = new Schema({
  taskId: String,
  details: String,
  isComplete: Boolean,
  isPriority: Boolean,
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date,
});

const SubTask = model("SubTask", subTaskSchema);

const create = async (subTaskData) => {
  const subTask = await SubTask.create({
    ...subTaskData,
    isComplete: false,
    isPriority: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  });

  return cleanData(subTask);
};

module.exports = { SubTask, create };
