const express = require("express");
const {
  getTasks,
  createNewTask,
  getTask,
} = require("../controllers/task-controllers");

const routes = express.Router();

routes.get("/", getTasks);

routes.post("/", createNewTask);

routes.get("/:taskId", getTask);

module.exports = routes;
