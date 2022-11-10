const { generateErrorMessage } = require("../../utils/helpers");
const {
  create: createSubTask,
  find: findSubTasks,
  update: updateSubTask,
  remove: removeSubTask,
} = require("../../database/v1/mongodb/models/subTask-models");

const addSubTask = async (req, res, next) => {
  const { taskId } = req.params;
  const { details } = req.body;

  try {
    const subTask = await createSubTask({ taskId, details });
    return res.status(201).send({ subTask });
  } catch (err) {
    console.log(err);
    const { status, message } = generateErrorMessage(err);
    next({ status, message });
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

const getSubTask = async (req, res, next) => {
  try {
    const subTask = req.subTask;

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
    const { status, message } = generateErrorMessage(err);

    next({ status, message });
  }
};

const deleteSubTask = async (req, res, next) => {
  const { subTaskId } = req.params;

  try {
    await removeSubTask(subTaskId);

    return res.status(201).send({ msg: "Sub Task Deleted" });
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
  deleteSubTask,
};
