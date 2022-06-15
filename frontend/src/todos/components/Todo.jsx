import React from 'react'
import { TextField, Button, Typography, Checkbox } from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import DeleteIcon from '@mui/icons-material/Delete'
import ago from 's-ago'

export const Todo = ({ todo, todoIndex, updateTodo, deleteTodo }) => {
  const date = new Date(todo.deadline)
  const timeAgoString = (date.getTime() && ago(date)) || null

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginTop: '1rem' }}>
      <Typography sx={{ margin: '8px' }} variant='h6'>
        {todoIndex + 1}
      </Typography>
      <Checkbox
        sx={{ margin: '8px' }}
        checked={todo.completed}
        onChange={(event) => updateTodo({ completed: event.target.checked })}
      />
      <TextField
        sx={{
          flexGrow: 1,
          textDecoration: todo.completed ? 'line-through' : 'none',
          marginRight: '8px',
        }}
        label='What to do?'
        value={todo.title}
        onChange={(event) => updateTodo({ title: event.target.value }, true)}
      />
      <DateTimePicker
        label='Deadline'
        value={todo.deadline}
        onChange={(date) => updateTodo({ deadline: date })}
        renderInput={(params) => <TextField {...params} />}
        ampm={false}
      />
      <Typography
        color={date < new Date() ? 'red' : 'gray'}
        sx={{ marginLeft: '8px', width: '10%' }}
      >
        {timeAgoString}
      </Typography>
      <Button
        size='small'
        color='secondary'
        sx={{ marginLeft: '8px' }}
        onClick={() => deleteTodo()}
      >
        <DeleteIcon />
      </Button>
    </div>
  )
}
