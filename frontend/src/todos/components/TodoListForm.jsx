import React, { useState, useEffect } from 'react'
import { TextField, Card, CardContent, CardActions, Button, Typography, Checkbox, LinearProgress } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'

export const TodoListForm = ({ todoList, saveTodoList, saving }) => {
  const [todos, setTodos] = useState(todoList.todos)

  const updateTodos = (index, name, completed) => {
    const todo = {
      name: name,
      completed: completed
    }

    setTodos([
      // immutable update
      ...todos.slice(0, index),
      todo,
      ...todos.slice(index + 1),
    ])
  }

  useEffect(() => {
    const debounce = setTimeout(() => {
      saveTodoList(todoList.id, { todos });
    }, 500)

    return () => clearTimeout(debounce)
  // eslint-disable-next-line
  }, [todos])

  return (
    <Card sx={{ margin: '0 1rem' }}>
      <CardContent>
        <Typography component='h2'>{todoList.title}</Typography>
        <form
          style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
        >
          {todos.map(({name, completed}, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <Checkbox 
                checked={completed}
                onChange={(event) => {
                  updateTodos(index, name, !completed)
                }}
              />
              <Typography sx={{ margin: '8px' }} variant='h6'>
                {index + 1}
              </Typography>
              <TextField
                sx={{ flexGrow: 1, marginTop: '1rem' }}
                label='What to do?'
                value={name}
                onChange={(event) => {
                  updateTodos(index, event.target.value, completed)
                }}
              />
              <Button
                sx={{ margin: '8px' }}
                size='small'
                color='secondary'
                onClick={() => {
                  setTodos([
                    // immutable delete
                    ...todos.slice(0, index),
                    ...todos.slice(index + 1),
                  ])
                }}
              >
                <DeleteIcon />
              </Button>
            </div>
          ))}
          <CardActions>
            <Button
              type='button'
              color='primary'
              onClick={() => {
                setTodos([...todos, {name: '', completed: false}])
              }}
            >
              Add Todo <AddIcon />
            </Button>
          </CardActions>
        </form>
        <Typography component='h2' align='center'>{ saving ? "Saving..." : "Saved!" }</Typography>
        { saving && <LinearProgress /> }
      </CardContent>
    </Card>
  )
}
