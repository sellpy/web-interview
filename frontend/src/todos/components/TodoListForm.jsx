import React, { useState } from 'react'
import { TextField, Card, CardContent, CardActions, Button, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit';

export const TodoListForm = ({ todoList, saveTodoList }) => {
  const [todos, setTodos] = useState(todoList.todos)


  const handleChange = (index, value) => {
    const newTodos = [
      ...todos.slice(0, index),
      {name: value, completed: todos[index].completed},
      ...todos.slice(index + 1),
    ]
    saveTodoList(todoList.id, { todos: newTodos })
    setTodos(newTodos)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    saveTodoList(todoList.id, { todos })
  }

  const handleDelete = (index) => {
    const newTodos = [
      ...todos.slice(0, index),
      ...todos.slice(index + 1),
    ]
    saveTodoList(todoList.id, {todos: newTodos})
    setTodos(newTodos)

  }

  const handleCompleted = (index, isCompleted) => {
    const newTodos = [
      ...todos.slice(0, index),
      {name: todos[index].name, completed: isCompleted},
      ...todos.slice(index + 1),
    ]
    saveTodoList(todoList.id, { todos: newTodos })
    setTodos(newTodos)
  }

  return (
    <Card sx={{ margin: '0 1rem' }}>
      <CardContent>
        <Typography component='h2'>{todoList.title}</Typography>
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
        >
          {todos.map((todo, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ margin: '8px' }} variant='h6'>
                {index + 1}
              </Typography>
              <TextField
                sx={{ flexGrow: 1, marginTop: '1rem', maxWidth: '50rem' }}
                label='What to do?'
                value={todo.name}
                onChange={(event) => handleChange(index, event.target.value)}
                disabled={todo.completed}
              />
              {todo.completed ? 
              <Button 
                sx={{ margin: '8px' }}
                color='primary'
                onClick={() => handleCompleted(index, false)}
              >
                <EditIcon />
              </Button> :
              <>
                <Button
                  sx={{ margin: '8px' }}
                  size='small'
                  color='secondary'
                  onClick={() => handleDelete(index)}
                >
                    <DeleteIcon />
                </Button>
                <Button 
                  sx={{ margin: '8px' }}
                  color='success'
                  onClick={() => handleCompleted(index, true)}
                >
                  <CheckCircleIcon />
                </Button>
              </>
              }
            </div>
          ))}
          <CardActions>
            <Button
              type='button'
              color='primary'
              onClick={() => setTodos([...todos, {name:'', completed: false}])}
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
