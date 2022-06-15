const router = require('express').Router()

const todoListRouter = require('./todo-list.router')

router.get('/', (req, res) => res.send('Hello World!'))
router.use('/todo-lists', todoListRouter)

module.exports = router
