const express = require("express");
const { checkTaskExistence } = require("../../middlewares/task-middlewares");
const { authenticateUser } = require("../../middlewares/user-middlewares");
const {
  getTasks,
  createNewTask,
  getTask,
  deleteTask,
  modifyTask,
} = require("../controllers/task-controllers");


const routes = express.Router();

routes.get("/", [authenticateUser], getTasks);

routes.post("/", createNewTask);

routes.get("/:taskId", [checkTaskExistence], getTask);

routes.delete("/:taskId", [checkTaskExistence], deleteTask);

routes.put("/:taskId", [checkTaskExistence], modifyTask);

module.exports = routes;
