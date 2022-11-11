const express = require("express");
const { createUser, authorizeUser } = require("../controllers/user-controller");
const {
  checkUserExistence,
  checkPassword,
} = require("../middlewares/user-middlewares");

const routes = express.Router();

routes.post("/", createUser);

routes.post("/auth", [checkUserExistence, checkPassword], authorizeUser);

module.exports = routes;
