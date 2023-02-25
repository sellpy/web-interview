const TodoLists = require('../models/TodoLists')

module.exports = {}

const getTodoLists = (_, res) => {
  let todoLists = TodoLists.getAllTodoLists()

  if (!todoLists || todoLists.length === 0) {
    res.status(204) // No content
  } else {
    todoLists = todoLists.reduce(
      (acc, next) => ({
        ...acc,
        [next.id]: next,
      }),
      {}
    )
  }

  res.json(todoLists).end()
}

module.exports = {
  getTodoLists,
}
