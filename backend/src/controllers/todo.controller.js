const { TodoModel } = require('../models')
const { internalServerError, checkMissingParameters } = require('../utils/responses.utils')

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
      const { title } = req.body

      const missingParamResponse = checkMissingParameters({ title })
      if (missingParamResponse)
        return res.status(missingParamResponse.code).json(missingParamResponse)

      await TodoModel.findOneAndUpdate({ _id: req.params.todoID }, { title })

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
