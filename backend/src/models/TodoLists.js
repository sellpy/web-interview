module.exports = {}

const initialTodoLists = [
  {
    id: '0000000001',
    title: 'First List',
    todos: ['First todo of first list!'],
  },
  {
    id: '0000000002',
    title: 'Second List',
    todos: ['First todo of second list!'],
  },
]

let todoLists = []

const getAllTodoLists = () => {
  if (todoLists.length === 0) {
    todoLists = initialTodoLists
  }

  return todoLists
}

const setAllTodoLists = (newTodoLists) => {
  todoLists = newTodoLists
  return todoLists
}

module.exports = {
  getAllTodoLists,
  setAllTodoLists,
}
