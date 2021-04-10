const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  id: String,
  title: String,
  todos: Array,
  completed: Boolean,
  created: {type: Date, default: Date.now},
});

module.exports =Todo= mongoose.model("Todo", TodoSchema);
