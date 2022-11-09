const { Schema, model } = require("mongoose");
const { cleanData } = require("../../utils/helpers");

const taskSchema = new Schema({
  title: String,
  description: String,
  author: String,
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date,
});

const Task = model("Task", taskSchema);

const create = async ({ title, description, author }) => {
  const data = {
    title,
    description,
    author,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    deletedAt: null,
  };
  const task = await Task.create(data);

  return cleanData(task);
};

const find = async () => {
  const tasks = await Task.find({ deletedAt: null });

  return tasks.map((task) => cleanData(task));
};

const findById = async (taskId) => {
  const task = await Task.findById(taskId);

  return cleanData(task);
};

const remove = async (taskId) => {
  const task = await Task.findOneAndUpdate(
    { _id: taskId },
    { deletedAt: new Date() }
  );

  return cleanData(task);
};

module.exports = {
  create,
  find,
  findById,
  remove,
};
