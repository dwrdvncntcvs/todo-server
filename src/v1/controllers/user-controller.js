const {
  create: createNewUser,
} = require("../../database/v1/mongodb/models/user-models");
const { generateErrorMessage } = require("../../utils/helpers");

const createUser = async (req, res) => {
  const { first_name, last_name, username, password } = req.body;
  console.table(req.body);

  try {
    const user = await createNewUser({ first_name, last_name, username, password });
    return res.status(200).send(user);
  } catch (err) {
    const { status, message } = generateErrorMessage(err);
    return res.status(status).send({ msg: message });
  }
};

module.exports = {
  createUser,
};
