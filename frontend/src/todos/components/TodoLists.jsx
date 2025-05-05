import React, { Fragment, useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
} from '@mui/material'
import ReceiptIcon from '@mui/icons-material/Receipt'
import CheckListCompleteIcon from '@mui/icons-material/ChecklistRtl'
import CheckListIncompleteIcon from '@mui/icons-material/Rule'
import { TodoListForm } from './TodoListForm'

const BASE_URL = 'http://localhost:3001'

// Debounce function to limit the rate at which a function can fire
const debounce = (fn, delay) => {
  let timer
  return (...args) => {
    clearTimeout(timer)

    return new Promise((resolve, reject) => {
      timer = setTimeout(async () => {
        try {
          const result = await fn(...args)
          resolve(result)
        } catch (error) {
          reject(error)
        }
      }, delay)
    })
  }
}

const fetchTodoLists = async () => {
  try {
    const response = await fetch(`${BASE_URL}/todo-lists`)
    if (!response.ok) {
      console.error(await response.text())
      const errorMessage = `Failed to fetch todo lists! Status: ${response.status} - ${response.statusText}`
      throw new Error(errorMessage)
    }
    return await response.json()
  } catch (error) {
    throw error
  }
}

const updateTodoList = async (id, updatedList) => {
  try {
    const response = await fetch(`${BASE_URL}/todo-lists/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedList),
    })
    if (!response.ok) {
      console.error(await response.text())
      const errorMessage = `Failed to save todo lists! Status: ${response.status} - ${response.statusText}`
      throw new Error(errorMessage)
    }
    return await response.json()
  } catch (error) {
    throw error
  }
}

const debouncedUpdateTodoList = debounce(updateTodoList, 500)

export const TodoLists = ({ style }) => {
  const [todoLists, setTodoLists] = useState({})
  const [activeList, setActiveList] = useState()

  const isTodoListCompleted = (todoList) =>
    todoList?.todos?.length > 0 && todoList?.todos?.every((todo) => todo.isCompleted)

  const handleUpdateTodoList = async (id, { todos }) => {
    const listToUpdate = todoLists[id]
    try {
      const responseData = await debouncedUpdateTodoList(id, { title: listToUpdate.title, todos })
      setTodoLists({
        ...todoLists,
        [id]: responseData,
      })
    } catch (error) {
      alert(error.message)
    }
  }

  useEffect(() => {
    fetchTodoLists()
      .then((responseData) => {
        setTodoLists(responseData)
      })
      .catch((error) => {
        alert(error.message)
      })
  }, [])

  if (!Object.keys(todoLists)?.length) return null
  return (
    <Fragment>
      <Card style={style}>
        <CardContent>
          <Typography component='h2'>My Todo Lists</Typography>
          <List>
            {Object.keys(todoLists).map((key) => {
              const todoList = todoLists[key]
              return (
                <ListItemButton key={key} onClick={() => setActiveList(key)}>
                  <ListItemIcon>
                    <ReceiptIcon />
                  </ListItemIcon>
                  <ListItemText primary={todoList.title} />
                  <ListItemIcon>
                    {isTodoListCompleted(todoList) ? (
                      <CheckListCompleteIcon color='success' />
                    ) : (
                      <CheckListIncompleteIcon />
                    )}
                  </ListItemIcon>
                </ListItemButton>
              )
            })}
          </List>
        </CardContent>
      </Card>
      {todoLists[activeList] && (
        <TodoListForm
          key={activeList} // use key to make React recreate component to reset internal state
          todoList={todoLists[activeList]}
          saveTodoList={(id, { todos }) => {
            handleUpdateTodoList(id, { todos })
          }}
        />
      )}
    </Fragment>
  )
}
