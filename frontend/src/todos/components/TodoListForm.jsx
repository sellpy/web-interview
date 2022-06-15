import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import AddIcon from '@mui/icons-material/Add'
import { debounce } from '../../utils/common-functions.util'
import TodoRequests from '../../requests/todo.requests'
import { Todo } from './Todo'

const debouncedUpdateTodoRequest = debounce(TodoRequests.updateTodo, 500)

export const TodoListForm = ({ todoList }) => {
  const [todos, setTodos] = useState([])
  const [allCompleted, setAllCompleted] = useState(false)

  useEffect(() => {
    const getTodos = async () => {
      const todos = await TodoRequests.getTodos(todoList._id)

      if (todos) {
        setTodos(todos)
      }
    }

    getTodos()
  }, [todoList._id])

  useEffect(() => {
    setAllCompleted((todos.every((todo) => todo.completed) && todos.length) || false)
  }, [todos])

  const addTodo = async () => {
    const newTodo = await TodoRequests.addTodo(todoList._id)

    if (newTodo) {
      setTodos([...todos, newTodo])
    }
  }

  const deleteTodo = async (index) => {
    const success = await TodoRequests.deleteTodo(todoList._id, todos[index]._id)

    if (success) {
      setTodos([
        // immutable delete
        ...todos.slice(0, index),
        ...todos.slice(index + 1),
      ])
    }
  }

  const updateTodo = async (index, updates, shouldDebounce = false) => {
    const updatedTodo = { ...todos[index] }
    for (const [key, value] of Object.entries(updates)) {
      updatedTodo[key] = value
    }

    setTodos([
      // immutable update
      ...todos.slice(0, index),
      updatedTodo,
      ...todos.slice(index + 1),
    ])

    if (shouldDebounce) {
      await debouncedUpdateTodoRequest(todoList._id, updatedTodo._id, updates)
    } else {
      return TodoRequests.updateTodo(todoList._id, updatedTodo._id, updates)
    }
  }

  return (
    <Card sx={{ margin: '0 1rem' }}>
      <CardContent>
        <Typography
          component='h2'
          sx={{ display: 'flex', textDecoration: allCompleted ? 'line-through' : 'none' }}
        >
          {todoList.title}
          {allCompleted && <CheckIcon sx={{ marginLeft: '16px' }} />}
        </Typography>
        <form style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          {todos.map((todo, index) => (
            <Todo
              key={index}
              todo={todo}
              todoIndex={index}
              updateTodo={(...args) => updateTodo(index, ...args)}
              deleteTodo={() => deleteTodo(index)}
            />
          ))}
          <CardActions>
            <Button type='button' color='primary' onClick={addTodo}>
              Add Todo <AddIcon />
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}
