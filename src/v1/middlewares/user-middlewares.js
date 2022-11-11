const {
  findByUsername,
  comparePassword,
  find: findUserById,
} = require("../../database/v1/mongodb/models/user-models");
const { verify } = require("jsonwebtoken");
const { SECRET_KEY } = require("../../variables");

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

const authenticateUser = async (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization.length < 1)
    return next({ status: 403, message: "Sign In First" });

  const token = authorization.replace("Bearer", "").trim();
  verify(token, SECRET_KEY, async (err, data) => {
    if (err) return next({ status: 403, message: "Sign In First" });

    console.log("Data: ", data);
    const { id } = data;
    const user = await findUserById(id);
    req.user = user;
    next();
  });
};

module.exports = {
  checkUserExistence,
  checkPassword,
  authenticateUser,
};
