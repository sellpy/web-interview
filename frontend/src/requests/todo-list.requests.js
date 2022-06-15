const { API_URL } = require('../utils/constants.util')

class TodoListRequests {
  static async getTodoLists() {
    try {
      const response = await fetch(`${API_URL}/todo-lists`)

      if (!response.ok) {
        return console.error(response.statusText)
      }

      const todoLists = await response.json()
      return todoLists
    } catch (error) {
      console.error(error)
    }
  }
}

export default TodoListRequests
