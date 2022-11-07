const express = require("express");
const { route } = require(".");

const routes = express.Router();

routes.get("/", (req, res) => {
  return res.status(200).send({ msg: "Hello World" });
});

module.exports = routes;
