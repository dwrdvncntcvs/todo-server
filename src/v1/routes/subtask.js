const express = require("express");
const {
  addSubTask,
  getSubTasks,
  getSubTask,
} = require("../controllers/subTask-controller");

const routes = express.Router();

routes.post("/task/:taskId", addSubTask);

routes.get("/task/:taskId", getSubTasks);

routes.get("/:subTaskId", getSubTask);

module.exports = routes;
