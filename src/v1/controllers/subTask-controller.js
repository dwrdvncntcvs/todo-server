const {
  create: createSubTask,
  find: findSubTasks,
  findById: findSubTask,
  update: updateSubTask,
} = require("../models/subTask-models");
const { update } = require("../models/task-models");

const addSubTask = async (req, res, next) => {
  const { taskId } = req.params;
  const { details } = req.body;

  try {
    const subTask = await createSubTask({ taskId, details });
    return res.status(201).send({ subTask });
  } catch (err) {
    console.log(err);
    next({ status: 500, message: err.message });
  }
};

const getSubTasks = async (req, res, next) => {
  const { taskId } = req.params;

  try {
    const subTasks = await findSubTasks(taskId);

    return res.status(200).send({ subTasks });
  } catch (err) {
    return next({ status: 500, message: err.message });
  }
};

const getSubTask = async (req, res) => {
  const { subTaskId } = req.params;

  try {
    const subTask = await findSubTask(subTaskId);

    return res.status(200).send({ subTask });
  } catch (err) {
    console.log(err);
    next({ status: 500, message: err.message });
  }
};

const modifySubTask = async (req, res, next) => {
  const { subTaskId } = req.params;
  const { details } = req.body;

  try {
    await updateSubTask({ subTaskId }, { details });

    return res.status(201).send({ msg: "Sub Task Updated" });
  } catch (err) {
    console.log(err);
    next({ status: 500, message: err.message });
  }
};

module.exports = {
  addSubTask,
  getSubTasks,
  getSubTask,
  modifySubTask,
};
