/**
 * @typedef {Object} Todo
 * @property {number} id - Auto-incrementing ID from SQLite
 * @property {string} content - The todo item text
 * @property {boolean} completed - Whether the todo is completed
 * @property {string} list_id - Foreign key reference to TodoList
 */

/**
 * @typedef {Object} TodoList
 * @property {string} id - Unique identifier for the todo list
 * @property {string} title - The title of the todo list
 * @property {string[]} todos - Array of todo item contents
 */

/**
 * @typedef {Object.<string, TodoList>} TodoListsMap
 */

const API_BASE_URL = 'http://localhost:3001/api'

export class TodoListsApi {
  /**
   * Fetches all todo lists from the backend
   * @returns {Promise<TodoListsMap>} Object mapping list IDs to TodoList objects
   * @throws {Error} If the network request fails
   */
  static async fetchTodoLists() {
    const response = await fetch(`${API_BASE_URL}/todo-lists`)

    if (!response.ok) {
      throw new Error('Failed to fetch todo lists')
    }

    return response.json()
  }

  /**
   * Saves or updates a todo list
   * @param {string} id - The ID of the todo list
   * @param {string} title - The title of the todo list
   * @param {string[]} todos - Array of todo item contents
   * @returns {Promise<{success: boolean}>} Success status from the backend
   * @throws {Error} If the network request fails
   */
  static async saveTodoList(id, title, todos) {
    const response = await fetch(`${API_BASE_URL}/todo-lists/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        todos,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to save todo list')
    }

    return response.json()
  }
}
