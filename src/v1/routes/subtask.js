const express = require("express");
const {
  addSubTask,
  getSubTasks,
  getSubTask,
  modifySubTask,
} = require("../controllers/subTask-controller");

const routes = express.Router();

routes.post("/task/:taskId", addSubTask);

routes.get("/task/:taskId", getSubTasks);

routes.get("/:subTaskId", getSubTask);

routes.put("/:subTaskId", modifySubTask);

module.exports = routes;
