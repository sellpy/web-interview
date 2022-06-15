const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
  todoList: { type: mongoose.Schema.Types.ObjectId, ref: 'TodoList', required: true },
  title: {
    type: String,
    default: '',
  },
  completed: {
    type: Boolean,
    default: false,
  },
})

const TodoModel = mongoose.model('Todo', TodoSchema)

module.exports = TodoModel
