const express = require("express");
const { getUser } = require("../controllers/user-controller");

const routes = express.Router();

routes.get("/", getUser);

module.exports = routes;
