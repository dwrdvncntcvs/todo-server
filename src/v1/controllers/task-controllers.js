const { generateErrorMessage } = require("../../utils/helpers");
const {
  find: findTasks,
  create: createTask,
  findById: findTask,
  remove: removeTask,
  update: updateTask,
} = require("../models/task-models");

const getTasks = async (req, res) => {
  try {
    const tasks = await findTasks();
    return res.status(200).send(tasks);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: err.message });
  }
};

const createNewTask = async (req, res) => {
  const { title, description, author } = req.body;

  try {
    const task = await createTask({ title, description, author });

    return res.status(201).send(task);
  } catch (err) {
    const { status, message } = generateErrorMessage(err);

    return res.status(status).send({ msg: message });
  }
};

const getTask = async (req, res, next) => {
  const task = req.task;
  return res.status(200).send({ task });
};

const deleteTask = async (req, res, next) => {
  const { taskId } = req.params;

  try {
    const task = await removeTask(taskId);
    return res.status(200).send(task);
  } catch (err) {
    console.log(err);
    next({ status: 500, msg: err.message });
  }
};

const modifyTask = async (req, res, next) => {
  const { taskId } = req.params;
  const { title, description } = req.body;

  try {
    await updateTask({ taskId }, { description, title });

    return res.status(201).send({ msg: "Task updated" });
  } catch (err) {
    const { status, message } = generateErrorMessage(err);

    next({ status, message });
  }
};

module.exports = {
  getTasks,
  getTask,
  createNewTask,
  deleteTask,
  modifyTask,
};
