const express = require("express");
const {
  getTasks,
  createNewTask,
  getTask,
  deleteTask,
} = require("../controllers/task-controllers");

const routes = express.Router();

routes.get("/", getTasks);

routes.post("/", createNewTask);

routes.get("/:taskId", getTask);

routes.delete("/:taskId", deleteTask);

module.exports = routes;
