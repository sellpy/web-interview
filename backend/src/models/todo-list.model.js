const mongoose = require('mongoose')

const TodoListSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
})

const TodoListModel = mongoose.model('TodoList', TodoListSchema)

module.exports = TodoListModel
