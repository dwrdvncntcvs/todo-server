const express = require("express");
const {
  addSubTask,
  getSubTasks,
  getSubTask,
  modifySubTask,
  deleteSubTask,
} = require("../controllers/subTask-controller");
const { checkSubTaskExistence } = require("../middlewares/subTask-middlewares");
const { checkTaskExistence } = require("../middlewares/task-middlewares");

const routes = express.Router();

routes.post("/task/:taskId", [checkTaskExistence], addSubTask);

routes.get("/task/:taskId", [checkTaskExistence], getSubTasks);

routes.get("/:subTaskId", [checkSubTaskExistence], getSubTask);

routes.put("/:subTaskId", [checkSubTaskExistence], modifySubTask);

routes.delete("/:subTaskId", [checkSubTaskExistence], deleteSubTask);

module.exports = routes;
