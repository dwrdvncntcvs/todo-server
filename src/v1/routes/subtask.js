const express = require("express");
const {
  addSubTask,
  getSubTasks,
} = require("../controllers/subTask-controller");

const routes = express.Router();

routes.post("/task/:taskId", addSubTask);

routes.get("/task/:taskId", getSubTasks);

module.exports = routes;
