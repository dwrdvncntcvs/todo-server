const express = require("express");
const {
  createTask,
  createSubTask,
  getTasks,
  deleteTask,
  updateSubTaskStatus,
  deleteSubTask,
} = require("../controllers/todoController");

const routes = express.Router();

routes.post("/create-new-task", createTask);

routes.post("/create-sub-task/:taskId", createSubTask);

routes.get("/get-tasks/:username", getTasks);

routes.put("/update-status/sub-task/:subTaskId", updateSubTaskStatus);

routes.delete("/delete-task/:taskId", deleteTask);

routes.delete("/delete-sub-task/:subTaskId", deleteSubTask);
module.exports = routes;
