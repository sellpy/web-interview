const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = mongoose.model({
  id: String,
  title: String,
  todos: Array,
  completed: Boolean,
  date: String,
});

module.exports = mongoose.model("Todo", TodoSchema);
