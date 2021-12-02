import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { TextField, Card, CardContent, CardActions, Button, Typography} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles({
  card: {
    margin: '1rem'
  },
  todoLine: {
    display: 'flex',
    alignItems: 'center'
  },
  textField: {
    flexGrow: 1
  },
  standardSpace: {
    margin: '8px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  }
})

export const TodoListForm = ({ toDoList, saveToDoList }) => {
  const classes = useStyles()
  const [todos, setTodos] = useState(toDoList.todos)

  const handleSubmit = event => {
    event.preventDefault()
    saveToDoList(toDoList.id, { todos })
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography component='h2'>
          {toDoList.title}
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          {todos.map((name, index) => (
            <div key={index} className={classes.todoLine}>
              <Typography className={classes.standardSpace} variant='h6'>
                {index + 1}
              </Typography>
              <TextField
                label='What to do?'
                value={name}
                onChange={event => {
                  setTodos([ // immutable update
                    ...todos.slice(0, index),
                    event.target.value,
                    ...todos.slice(index + 1)
                  ])
                }}
                className={classes.textField}
              />
              <Button
                size='small'
                color='secondary'
                className={classes.standardSpace}
                onClick={() => {
                  setTodos([ // immutable delete
                    ...todos.slice(0, index),
                    ...todos.slice(index + 1)
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
