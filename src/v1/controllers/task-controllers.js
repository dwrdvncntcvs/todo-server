const {
  find: findTasks,
  create: createTask,
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

module.exports = {
  getTasks,
  createNewTask,
};
