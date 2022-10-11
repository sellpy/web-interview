import React from 'react'
import { TextField, Card, CardContent, CardActions, Button, Typography, Checkbox } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'

export const TodoListForm = ({ todoList, saveTodoList }) => {

  return (
    <Card sx={{ margin: '0 1rem' }}>
      <CardContent>
        <Typography component='h2'>{todoList.title}</Typography>
        <form
          style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
        >
          {todoList.todos.map((todo, index) => {
            const completeDate = Date.parse(todo.completeDate);
            const daysLeft = Math.ceil(Math.abs(completeDate-Date.now())/1000/60/60/24) - (completeDate>Date.now()?0:1);
            return <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ margin: '8px' }} variant='h6'>
                {index + 1}
              </Typography>
              <Checkbox
                checked={todo.completed}
                onClick={() => {
                  saveTodoList([
                    // immutable update
                    ...todoList.todos.slice(0, index),
                    { ...todo, completed: !todo.completed },
                    ...todoList.todos.slice(index + 1),
                  ])
                }}
              />
              <input
                value={todo.completeDate}
                type={'date'}
                onChange={(event) => {
                  saveTodoList([
                    // immutable update
                    ...todoList.todos.slice(0, index),
                    { ...todo, completeDate: event.target.value },
                    ...todoList.todos.slice(index + 1),
                  ])
                }}
              />
              <TextField
                sx={{ flexGrow: 0, marginTop: '1rem' }}
                disabled={true}
                label={Number.isNaN(daysLeft)?'':'Expected completion date'}
                value={todo.completed?'Completed!':Number.isNaN(daysLeft)?'':daysLeft===0?'Today':(completeDate>Date.now()?'In ' + daysLeft + (daysLeft>1?' days':' day') : daysLeft + (daysLeft>1?' days':' day') + ' ago')}
              />
              <TextField
                sx={{ flexGrow: 1, marginTop: '1rem' }}
                label='What to do?'
                value={todo.title}
                onChange={(event) => {
                  saveTodoList([
                    // immutable update
                    ...todoList.todos.slice(0, index),
                    { ...todo, title: event.target.value },
                    ...todoList.todos.slice(index + 1),
                  ])
                }}
              />
              <Button
                sx={{ margin: '8px' }}
                size='small'
                color='secondary'
                onClick={() => {
                  saveTodoList([
                    // immutable delete
                    ...todoList.todos.slice(0, index),
                    ...todoList.todos.slice(index + 1),
                  ])
                }}
              >
                <DeleteIcon />
              </Button>
            </div>
          })}
          <CardActions>
            <Button
              type='button'
              color='primary'
              onClick={() => {
                saveTodoList([...todoList.todos, {title: '', completeDate: Date.now(), completed: false}])
              }}
            >
              Add Todo <AddIcon />
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}
