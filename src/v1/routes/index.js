const express = require("express");
const todo = require("./todo");
const subtasks = require("./subtask");

const routes = express.Router();

routes.use("/todo", todo);
routes.use("/subtask", subtasks);

module.exports = routes;
