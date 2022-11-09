const express = require("express");
const { create, find } = require("../models/task-models");

const routes = express.Router();

routes.get("/", async (req, res) => {
  const tasks = await find();
  return res.status(200).send(tasks);
});

routes.post("/", async (req, res) => {
  const { title, description, author } = req.body;

  try {
    const task = await create({ title, description, author });

    return res.status(200).send(task);
  } catch (err) {
    console.log(err);
  }
});

module.exports = routes;
