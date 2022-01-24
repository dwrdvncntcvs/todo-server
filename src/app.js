const express = require("express");
const { sequelize } = require("../models");
const todoRoutes = require("./routes/todoRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).send({ message: "Hello World" });
});

app.use(todoRoutes);

app.listen(PORT, () => {
  console.log(`SERVER UP: http://localhost:${PORT}`);
  sequelize.authenticate();
  console.log("Connected to Database");
});
