const { create: createSubTask } = require("../models/subTask-models");

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

module.exports = {
  addSubTask,
};
