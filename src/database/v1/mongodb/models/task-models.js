const { Schema, model } = require("mongoose");
const { cleanData } = require("../../../../utils/helpers");
const { SubTask } = require("./subTask-models");

const validationMessage = {
  title: {
    required: { status: 403, message: "Title is required" },
    unique: { status: 403, message: "Title has been used already" },
  },
  author: {
    required: { status: 403, message: "Author is required" },
  },
};

const taskSchema = new Schema({
  title: {
    type: String,
    required: [true, JSON.stringify(validationMessage.title.required)],
    unique: true,
  },
  description: {
    type: String,
  },
  author: {
    type: String,
    required: [true, JSON.stringify(validationMessage.author.required)],
  },
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

const update = async ({ taskId }, { title, description }) => {
  return await Task.findOneAndUpdate({ _id: taskId }, { title, description });
};

const remove = async (taskId) => {
  const task = await Task.findOneAndUpdate(
    { _id: taskId },
    { deletedAt: new Date() }
  );

  return cleanData(task);
};

const removePermanently = async (taskId) => {
  await Task.deleteOne({ _id: taskId });
  await SubTask.deleteMany({ taskId });
  return;
};

module.exports = {
  Task,
  create,
  find,
  findById,
  remove,
  update,
  removePermanently,
};
