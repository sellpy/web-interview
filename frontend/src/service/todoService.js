import axios from 'axios'
import { SERVER_URL } from "../constants/constants"

export const fetchAllTodoLists = async () => {
    try {
    const res = await axios.get(SERVER_URL)
    return res.data
  } catch (error) {
    return console.error(error)
  }
}

export const saveAllTodoLists = async (allTodoLists) => {
  try {
    return await axios.post(SERVER_URL, allTodoLists)
  } catch (error) {
    return console.error(error)
  }
}