const { TodoModel } = require('../models')
const {
  internalServerError,
  checkMissingParameters,
  checkMissingAllParameters,
} = require('../utils/responses.utils')

class TodoController {
  static async getTodos(req, res) {
    try {
      const todos = await TodoModel.find({ todoList: req.params.todoListID })

      res.status(200).json(todos)
    } catch (error) {
      internalServerError(req, res, error)
    }
  }

  static async createTodo(req, res) {
    try {
      const { title } = req.body

      const missingParamResponse = checkMissingParameters({ title })
      if (missingParamResponse)
        return res.status(missingParamResponse.code).json(missingParamResponse)

      const todo = await TodoModel.create({
        todoList: req.params.todoListID,
        title,
      })

      res.status(201).json(todo)
    } catch (error) {
      internalServerError(req, res, error)
    }
  }

  static async updateTodo(req, res) {
    try {
      const { title, completed, deadline } = req.body

      const missingParamResponse = checkMissingAllParameters({ title, completed, deadline })
      if (missingParamResponse)
        return res.status(missingParamResponse.code).json(missingParamResponse)

      const updates = {}
      if (title !== undefined) updates.title = title
      if (completed !== undefined) updates.completed = completed
      if (deadline !== undefined) updates.deadline = deadline

      await TodoModel.findOneAndUpdate({ _id: req.params.todoID }, updates)

      res.status(204).send()
    } catch (error) {
      internalServerError(req, res, error)
    }
  }

  static async deleteTodo(req, res) {
    try {
      await TodoModel.findOneAndDelete({ _id: req.params.todoID })

      res.status(204).send()
    } catch (error) {
      internalServerError(req, res, error)
    }
  }
}

module.exports = TodoController
