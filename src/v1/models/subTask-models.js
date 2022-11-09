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

const find = async (taskId) => {
  const subTasks = await SubTask.find({ taskId });

  return subTasks.map((task) => cleanData(task));
};

const findById = async (taskId) => {
  const subTask = await SubTask.findById(taskId);

  return cleanData(subTask);
};

const update = async ({ subTaskId }, subTaskData) => {
  const subTask = await SubTask.findOneAndUpdate(
    { _id: subTaskId },
    { ...subTaskData }
  );

  return cleanData(subTask);
};

module.exports = { SubTask, create, find, findById, update };
