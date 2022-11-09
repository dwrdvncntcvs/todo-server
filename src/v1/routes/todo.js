const express = require("express");
const { getTasks, createNewTask } = require("../controllers/task-controllers");

const routes = express.Router();

routes.get("/", getTasks);

routes.post("/", createNewTask);

module.exports = routes;
