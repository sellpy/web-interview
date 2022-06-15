const { TodoListModel } = require('../models')
const { internalServerError } = require('../utils/responses.utils')

class TodoListController {
  static async getTodoLists(req, res) {
    try {
      const todoLists = await TodoListModel.find()
      res.status(200).json(todoLists)
    } catch (error) {
      internalServerError(req, res, error)
    }
  }
}

module.exports = TodoListController
