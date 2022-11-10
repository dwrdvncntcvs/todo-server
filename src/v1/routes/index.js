const express = require("express");
const task = require("./task");
const subtask = require("./subtask");
const user = require("./user");

const routes = express.Router();

routes.use("/task", task);
routes.use("/subtask", subtask);
routes.use("/user", user);

module.exports = routes;
