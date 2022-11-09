const express = require("express");
const task = require("./task");
const subtasks = require("./subtask");

const routes = express.Router();

routes.use("/task", task);
routes.use("/subtask", subtasks);

module.exports = routes;
