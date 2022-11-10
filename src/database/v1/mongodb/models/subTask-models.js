const { Schema, model } = require("mongoose");
const { cleanData } = require("../../../../utils/helpers");

const validation = {
  taskId: {
    required: { status: 403, message: "Task ID is required" },
  },
  details: {
    required: { status: 403, message: "Task details is required" },
  },
};

const subTaskSchema = new Schema({
  taskId: {
    type: String,
    required: [true, JSON.stringify(validation.taskId.required)],
  },
  details: {
    type: String,
    required: [true, JSON.stringify(validation.details.required)],
  },
  isComplete: Boolean,
  isPriority: Boolean,
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date,
});

const SubTask = model("SubTask", subTaskSchema);

const create = async ({ taskId, details }) => {
  const subTask = await SubTask.create({
    taskId,
    details,
    isComplete: false,
    isPriority: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  });

  return cleanData(subTask);
};

const find = async (taskId) => {
  const subTasks = await SubTask.find({ taskId, deletedAt: null });

  return subTasks.map((task) => cleanData(task));
};

const findById = async (subTaskId) => {
  const subTask = await SubTask.findOne({ _id: subTaskId, deletedAt: null });

  return cleanData(subTask);
};

const update = async ({ subTaskId }, { details }) => {
  const subTask = await SubTask.findOneAndUpdate(
    { _id: subTaskId },
    { details },
    { runValidators: true }
  );

  return cleanData(subTask);
};

const remove = async (subTaskId) => {
  return await SubTask.findOneAndUpdate(
    { _id: subTaskId },
    { deletedAt: new Date() }
  );
};

module.exports = { SubTask, create, find, findById, update, remove };
