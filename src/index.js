const express = require("express");
const cors = require("cors");
const { dbConnect } = require("./database/v1/mongodb/config/mongodb");
const v1Routes = require("./v1/routes");
const { versions } = require("./variables");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/v1", v1Routes);

const displayAppVersions = () => {
  console.log("API VERSIONS: ");
  for (let version in versions) {
    console.log(`- ${versions[version]}`);
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
