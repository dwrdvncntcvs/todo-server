const express = require("express");
const { dbConnect } = require("./v1/config/mongodb");
const v1Routes = require("./v1/routes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use("/v1", v1Routes);

app.listen(PORT, () => {
  console.log("SERVER UP -> PORT:", PORT);
  dbConnect("todo");
});
