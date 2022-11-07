const express = require("express");
const todo = require("./todo");

const routes = express.Router();

routes.use("/todo", todo);

module.exports = routes;
