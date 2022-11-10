const {
  findById: findTask,
} = require("../../database/v1/mongodb/models/task-models");

const checkTaskExistence = async (req, res, next) => {
  const { taskId } = req.params;

  try {
    const task = await findTask(taskId);

    req.task = task;
    next();
  } catch (err) {
    console.log(err.message);
    next({ status: 404, message: "Task not found" });
  }
};

module.exports = {
  checkTaskExistence,
};
