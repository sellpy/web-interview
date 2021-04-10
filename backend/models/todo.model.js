const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const taskSchema = require('./task.model').TaskSchema;

const TodoSchema = new Schema({
  id: String,
  title: String,
  todos: [taskSchema],
  completed: Boolean,
  created: {type: Date, default: Date.now},
});

module.exports =Todo= mongoose.model("Todo", TodoSchema);
