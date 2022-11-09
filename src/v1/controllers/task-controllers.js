const {
  find: findTasks,
  create: createTask,
  findById: findTask,
  remove: removeTask,
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

    return res.status(200).send(task);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: err.message });
  }
};

const getTask = async (req, res, next) => {
  const { taskId } = req.params;

  try {
    const task = await findTask(taskId);
    return res.status(200).send({ task });
  } catch (err) {
    console.log(err);
    next({ status: 404, message: err.message });
  }
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

module.exports = {
  getTasks,
  getTask,
  createNewTask,
  deleteTask,
};
