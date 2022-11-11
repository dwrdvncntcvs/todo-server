const express = require("express");
const {
  checkUserExistence,
  checkPassword,
} = require("../../middlewares/user-middlewares");
const { createUser, authorizeUser } = require("../controllers/user-controller");

const routes = express.Router();

routes.post("/", createUser);

routes.post("/auth", [checkUserExistence, checkPassword], authorizeUser);

module.exports = routes;
