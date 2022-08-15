import axios from 'axios'
import { config } from '../../config'

const client = axios.create({
  baseURL: `${config.db.baseUrl}:${config.db.port}`,
})

export const fetchTodoLists = async () => {
  try {
    const response = await client.get('/lists')
    return response.data
  } catch (error) {
    return console.error(error)
  }
}

export const putTodoList = async (id, todos) => {
  try {
    return client.put(`/lists/${id}`, todos)
  } catch (error) {
    return console.error(error)
  }
}
