const { Schema, model } = require("mongoose");
const { genSalt, hash } = require("bcrypt");
const { cleanData } = require("../../../../utils/helpers");

const validation = {
  first_name: {
    required: { status: 403, message: "First name is required" },
  },
  last_name: {
    required: { status: 403, message: "Last name is required" },
  },
  username: {
    required: { status: 403, message: "Username is required" },
  },
  password: {
    required: { status: 403, message: "Password is required" },
  },
};

const userSchema = new Schema({
  first_name: {
    type: String,
    required: [true, JSON.stringify(validation.first_name.required)],
  },
  last_name: {
    type: String,
    required: [true, JSON.stringify(validation.last_name.required)],
  },
  username: {
    type: String,
    required: [true, JSON.stringify(validation.username.required)],
    unique: true,
  },
  password: {
    type: String,
    required: [true, JSON.stringify(validation.password.required)],
  },
});

userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified()) next();

  try {
    const salt = await genSalt(10, "a");
    const hashPassword = await hash(user.password, salt);
    user.password = hashPassword;
    next();
  } catch (err) {
    next({ status: 401, message: err.message });
  }
});

const User = model("User", userSchema);

const create = async ({ first_name, last_name, username, password }) => {
  const user = await User.create({ first_name, last_name, username, password });
  return cleanData(user);
};

module.exports = {
  User,
  create,
};
