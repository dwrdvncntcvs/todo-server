const { Schema, model } = require("mongoose");

const subTaskSchema = new Schema({
  taskId: String,
  description: String,
  isComplete: Boolean,
  isPriority: Boolean,
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date,
});

const SubTask = model("SubTask", subTaskSchema);


