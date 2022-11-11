const { sign } = require("jsonwebtoken");
const {
  create: createNewUser,
} = require("../../database/v1/mongodb/models/user-models");
const { generateErrorMessage } = require("../../utils/helpers");
const { SECRET_KEY } = require("../../variables");

const createUser = async (req, res) => {
  const { first_name, last_name, username, password } = req.body;
  console.table(req.body);

  try {
    const user = await createNewUser({
      first_name,
      last_name,
      username,
      password,
    });
    return res.status(200).send(user);
  } catch (err) {
    const { status, message } = generateErrorMessage(err);
    return res.status(status).send({ msg: message });
  }
};

const authorizeUser = async (req, res) => {
  const { id, username } = req.user;

  const payload = {
    username,
    id,
    last_signed_in: new Date(),
  };

  const refresh_token = sign(payload, SECRET_KEY, { expiresIn: "365d" });
  const token = sign(payload, SECRET_KEY, { expiresIn: "24h" });

  req.cookie("jwt", refresh_token, {
    httpOnly: true,
    sameSite: "None",
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  console.log(req.cookies);
  return res.status(200).send({ token });
};

module.exports = {
  createUser,
  authorizeUser,
};
