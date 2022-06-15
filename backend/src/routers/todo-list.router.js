const router = require('express').Router()
const todoRouter = require('./todo.router')
const { TodoListController } = require('../controllers')

router.use('/:todoListID/todos', todoRouter)

router.get('/', TodoListController.getTodoLists)

module.exports = router
