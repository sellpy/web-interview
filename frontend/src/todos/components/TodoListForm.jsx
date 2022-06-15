import React, { useState, useEffect } from 'react'
import {
  TextField,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Checkbox,
} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import { debounce } from '../../utils/common-functions.util'
import TodoRequests from '../../requests/todo.requests'

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
    setAllCompleted(todos.every((todo) => todo.completed))
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
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ margin: '8px' }} variant='h6'>
                {index + 1}
              </Typography>
              <Checkbox
                sx={{ margin: '8px' }}
                checked={todo.completed}
                onChange={(event) => updateTodo(index, { completed: event.target.checked })}
              />
              <TextField
                sx={{
                  flexGrow: 1,
                  marginTop: '1rem',
                  textDecoration: todo.completed ? 'line-through' : 'none',
                }}
                label='What to do?'
                value={todo.title}
                onChange={(event) => updateTodo(index, { title: event.target.value }, true)}
              />
              <Button size='small' color='secondary' onClick={() => deleteTodo(index)}>
                <DeleteIcon />
              </Button>
            </div>
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
