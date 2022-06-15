const router = require('express').Router({ mergeParams: true })
const { TodoController } = require('../controllers')

router.get('/', TodoController.getTodos)
router.post('/', TodoController.createTodo)
router.put('/:todoID', TodoController.updateTodo)
router.delete('/:todoID', TodoController.deleteTodo)

module.exports = router
