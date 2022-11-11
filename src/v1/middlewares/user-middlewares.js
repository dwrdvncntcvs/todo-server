const {
  findByUsername,
  comparePassword,
} = require("../../database/v1/mongodb/models/user-models");

const checkUserExistence = async (req, res, next) => {
  const { username } = req.body;

  const user = await findByUsername(username);

  if (!user) next({ status: 404, message: "User not found" });

  req.user = user;
  next();
};

const checkPassword = async (req, res, next) => {
  const { password } = req.body;
  const user = req.user;

  const isPasswordValid = await comparePassword({
    storedPassword: user.password,
    password,
  });

  if (!isPasswordValid) next({ status: 403, message: "Incorrect Password" });

  next();
};

module.exports = {
  checkUserExistence,
  checkPassword,
};
