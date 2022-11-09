const express = require("express");
const { addSubTask } = require("../controllers/subTask-controller");

const routes = express.Router();

routes.post("/:taskId", addSubTask);

module.exports = routes;
