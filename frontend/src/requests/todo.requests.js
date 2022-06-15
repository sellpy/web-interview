const { API_URL } = require('../utils/constants.util')

class TodoRequests {
  static async getTodos(todoListID) {
    try {
      const response = await fetch(`${API_URL}/todo-lists/${todoListID}/todos`)

      if (!response.ok) {
        return console.error(response.statusText)
      }

      const todos = await response.json()
      return todos
    } catch (error) {
      console.error(error)
    }
  }

  static async addTodo(todoListID) {
    try {
      const newTodo = { title: '' }

      const response = await fetch(`${API_URL}/todo-lists/${todoListID}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      })

      if (!response.ok) {
        return console.error(response.statusText)
      }

      const createdTodo = await response.json()
      return createdTodo
    } catch (error) {
      console.error(error)
    }
  }

  static async updateTodo(todoListID, todoID, updates) {
    try {
      const response = await fetch(`${API_URL}/todo-lists/${todoListID}/todos/${todoID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      })

      if (!response.ok) {
        return console.error(response.statusText)
      }

      return true
    } catch (error) {
      console.error(error)
    }
  }

  static async deleteTodo(todoListID, index) {
    try {
      const response = await fetch(`${API_URL}/todo-lists/${todoListID}/todos/${index}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        return console.error(response.statusText)
      }

      return true
    } catch (error) {
      console.error(error)
    }
  }
}

export default TodoRequests
