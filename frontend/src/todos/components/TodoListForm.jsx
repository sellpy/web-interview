import React, { useState, useEffect } from 'react'
import { TextField, Card, CardContent, CardActions, Button, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import { debounce } from '../../utils/common-functions.util'
import TodoRequests from '../../requests/todo.requests'

const debouncedUpdateTodoRequest = debounce(TodoRequests.updateTodo, 500)

export const TodoListForm = ({ todoList }) => {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    const getTodos = async () => {
      const todos = await TodoRequests.getTodos(todoList._id)

      if (todos) {
        setTodos(todos)
      }
    }

    getTodos()
  }, [todoList._id])

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

  const updateTodo = async (index, updates) => {
    const updatedTodo = { ...todos[index] }
    if (updates.title !== undefined) updatedTodo.title = updates.title

    setTodos([
      // immutable update
      ...todos.slice(0, index),
      updatedTodo,
      ...todos.slice(index + 1),
    ])

    await debouncedUpdateTodoRequest(todoList._id, updatedTodo)
  }

  return (
    <Card sx={{ margin: '0 1rem' }}>
      <CardContent>
        <Typography component='h2'>{todoList.title}</Typography>
        <form style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          {todos.map((todo, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ margin: '8px' }} variant='h6'>
                {index + 1}
              </Typography>
              <TextField
                sx={{ flexGrow: 1, marginTop: '1rem' }}
                label='What to do?'
                value={todo.title}
                onChange={(event) => updateTodo(index, { title: event.target.value })}
              />
              <Button
                sx={{ margin: '8px' }}
                size='small'
                color='secondary'
                onClick={() => deleteTodo(index)}
              >
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
