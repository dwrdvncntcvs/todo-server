const { sequelize, Task, SubTask } = require("../../models");
const { checkIfValidUUID } = require("../utils/patters");
const { ValidateToDo } = require("../validators/todoValidator");

exports.createTask = async (req, res) => {
  const { name, username } = req.body;

  const { state } = new ValidateToDo({ body: req.body });
  if (state !== null)
    return res.status(state.status).send({ msg: state.message });

  const transaction = await sequelize.transaction();
  try {
    await Task.create({ name, username }, { transaction });
    await transaction.commit();

    return res.status(200).send({ msg: "Task Created." });
  } catch (err) {
    console.log(err.message);
    await transaction.rollback();
    return res.status(500).send({ msg: "Something went wrong" });
  }
};

exports.createSubTask = async (req, res) => {
  const taskId = req.params.taskId;
  const { name, description } = req.body;

  const checkId = checkIfValidUUID(taskId);
  const foundTask =
    checkId === true ? await Task.findOne({ where: { id: taskId } }) : null;

  const { state } = new ValidateToDo({
    body: req.body,
    checkedId: checkId,
    foundTask,
  });
  if (state !== null)
    return res.status(state.status).send({ msg: state.message });

  const transaction = await sequelize.transaction();
  try {
    await SubTask.create(
      { name, description, taskId: foundTask.id },
      { transaction }
    );
    await transaction.commit();

    return res
      .status(200)
      .send({ msg: `SubTask added to your main task: ${foundTask.name}` });
  } catch (err) {
    console.log(err);
    await transaction.rollback();
    return res.status(500).send({ msg: "Something wen wrong" });
  }
};

exports.getTasks = async (req, res) => {
  const username = req.params.username;

  const tasks = await Task.findAll({
    where: { username },
    include: [SubTask],
  });

  const { state } = new ValidateToDo({ tasks });
  if (state !== null)
    return res.status(state.status).send({ msg: state.message });

  try {
    return res.status(200).send({ tasks });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "Something went wrong" });
  }
};

exports.deleteTask = async (req, res) => {
  const taskId = req.params.taskId;

  const isUuid = checkIfValidUUID(taskId);
  const foundTask = isUuid
    ? await Task.findOne({ where: { id: taskId } })
    : null;

  const { state } = new ValidateToDo({ checkedId: isUuid, foundTask });
  if (state !== null)
    return res.status(state.status).send({ msg: state.message });

  const transaction = await sequelize.transaction();
  try {
    await Task.destroy({ where: { id: foundTask.id } }, { transaction });
    await transaction.commit();

    return res.status(200).send({ msg: "Task deleted" });
  } catch (err) {
    console.log(err.message);
    await transaction.rollback();
    return res.status(500).send({ msg: "Something went wrong" });
  }
};

exports.deleteSubTask = async (req, res) => {
  const subTaskId = req.params.subTaskId;

  const isUuid = checkIfValidUUID(subTaskId);
  const foundSubTask = isUuid
    ? await SubTask.findOne({ where: { id: subTaskId } })
    : null;

  const { state } = new ValidateToDo({ checkedId: isUuid, foundSubTask });
  if (state !== null)
    return res.status(state.status).send({ msg: state.message });

  const transaction = await sequelize.transaction();
  try {
    await SubTask.destroy({ where: { id: subTaskId } }, { transaction });
    await transaction.commit();

    return res.status(200).send({ msg: "Sub task deleted" });
  } catch (err) {
    console.log(err.message);
    await transaction.rollback();
    return res.status(500).send({ msg: "Something went wrong" });
  }
};

exports.updateSubTaskStatus = async (req, res) => {
  const subTaskId = req.params.subTaskId;
  const { isDone, isPriority } = req.body;

  const isUuid = checkIfValidUUID(subTaskId);
  const foundSubTask = isUuid
    ? await SubTask.findOne({ where: { id: subTaskId } })
    : null;

  const { state } = new ValidateToDo({ body: req.body, foundSubTask });
  if (state !== null)
    return res.status(state.status).send({ msg: state.message });

  const transaction = await sequelize.transaction();
  try {
    await SubTask.update(
      { isDone, isPriority },
      { where: { id: subTaskId } },
      { transaction }
    );
    await transaction.commit();

    return res.status(200).send({ msg: "Subtask completion status updated" });
  } catch (err) {
    console.log(err.message);
    await transaction.rollback();
    return res.status(500).send({ msg: "Something went wrong" });
  }
};
