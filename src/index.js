const express = require("express");
const { dbConnect } = require("./v1/config/mongodb");
const v1Routes = require("./v1/routes");
const { versions } = require("./variables");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/v1", v1Routes);

const displayAppVersions = () => {
  console.log("API VERSIONS: ");
  for (let i = 0; i < versions.length; i++) {
    console.log(`- ${versions[i]}`);
  }
};

app.use((err, req, res, next) => {
  console.log(err);
  if (err) return res.status(err.status).send({ msg: err.message });
});

app.listen(PORT, () => {
  console.log("SERVER UP -> PORT:", PORT);
  displayAppVersions();
  dbConnect("todo");
});
