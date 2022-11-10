const { findById: findSubTask } = require("../models/subTask-models");

const checkSubTaskExistence = async (req, res, next) => {
  const { subTaskId } = req.params;

  try {
    const subTask = await findSubTask(subTaskId);
    req.subTask = subTask;

    next();
  } catch (err) {
    next({ status: 404, message: "Sub task not found" });
  }
};

module.exports = {
  checkSubTaskExistence,
};
