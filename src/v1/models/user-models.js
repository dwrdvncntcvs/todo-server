const { Schema, model } = require("mongoose");

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

const User = model("User", userSchema);

module.exports = {
  User,
};
