import React, { useState, useEffect, useCallback } from 'react'
import { TextField, Card, CardContent, CardActions, Button, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import { useDebounce } from '../../utils/hooks'

export const TodoListForm = ({ todoList, saveTodoList }) => {
  const [todos, setTodos] = useState(todoList.todos)
  const saveCallback = useCallback(
    (todos) => {
      saveTodoList(todoList.id, { todos })
    },
    [todoList.id, saveTodoList]
  )

  const debouncedSave = useDebounce(saveCallback, 400)

  useEffect(() => {
    if (todos !== todoList.todos) {
      debouncedSave(todos)
    }
  }, [todos, debouncedSave, todoList.todos])

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault()
    }
    saveTodoList(todoList.id, { todos })
  }

  const handleEnterPress = (event, _) => {
    if (event.key === 'Enter' && event.target.value !== '') {
      event.preventDefault()
      handleSubmit()
      setTodos([...todos, ''])

      setTimeout(() => {
        const inputs = document.querySelectorAll('input[type="text"]')
        const newInput = inputs[inputs.length - 1]
        newInput.focus()
      }, 0)
    }
  }

  return (
    <Card sx={{ margin: '0 1rem' }}>
      <CardContent>
        <Typography component='h2'>{todoList.title}</Typography>
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
        >
          {todos.map((name, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ margin: '8px' }} variant='h6'>
                {index + 1}
              </Typography>
              <TextField
                sx={{ flexGrow: 1, marginTop: '1rem' }}
                label='What to do?'
                value={name}
                onChange={(event) => {
                  setTodos([
                    ...todos.slice(0, index),
                    event.target.value,
                    ...todos.slice(index + 1),
                  ])
                }}
                onKeyDown={(event) => handleEnterPress(event, index)}
              />
              <Button
                sx={{ margin: '8px' }}
                size='small'
                color='secondary'
                onClick={() => {
                  setTodos([...todos.slice(0, index), ...todos.slice(index + 1)])
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
                setTodos([...todos, ''])
              }}
            >
              Add Todo <AddIcon />
            </Button>
            <Button type='submit' variant='contained' color='primary'>
              Save
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}
