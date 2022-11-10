const express = require("express");
const { createUser } = require("../controllers/user-controller");

const routes = express.Router();

routes.post("/", createUser);

module.exports = routes;
