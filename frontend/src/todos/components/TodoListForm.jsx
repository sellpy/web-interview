import React from 'react'
import {
  TextField,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Checkbox,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'

const computeDueDate = (dueDateStr) => {
  // Parse the due date string
  const [day, month, year] = dueDateStr.split('/').map(Number)
  const dueDate = new Date(year, month - 1, day)

  // Get current date
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Calculate difference in milliseconds
  const diffMs = dueDate - today

  // Convert to days
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays > 0) {
    return `Due in ${diffDays} day(s)`
  } else if (diffDays < 0) {
    return `Overdue by ${Math.abs(diffDays)} day(s)`
  } else {
    return 'Due today'
  }
}

export const TodoListForm = ({ todoList, saveTodoList }) => {
  const setTodos = (newTodos) => {
    saveTodoList(todoList.id, { todos: newTodos })
  }

  return (
    <Card sx={{ margin: '0 1rem' }}>
      <CardContent>
        <Typography component='h2' style={{ marginBottom: '1rem' }}>
          {todoList.title}
        </Typography>
        <form style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, rowGap: '1rem' }}>
          {todoList?.todos?.map((todo, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'start', columnGap: '1rem' }}>
              <Typography variant='h6'>{index + 1}</Typography>
              <TextField
                sx={{ flexGrow: 1 }}
                label='What to do?'
                defaultValue={todo.title}
                onChange={(event) => {
                  setTodos([
                    // immutable update
                    ...todoList?.todos?.slice(0, index),
                    { ...todo, title: event.target.value },
                    ...todoList?.todos?.slice(index + 1),
                  ])
                }}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label='Due date'
                  inputFormat='DD/MM/YYYY'
                  value={todo.dueDate ? dayjs(todo.dueDate) : null}
                  onChange={(newValue) => {
                    setTodos([
                      // immutable update
                      ...todoList?.todos?.slice(0, index),
                      { ...todo, dueDate: dayjs(newValue).format('YYYY-MM-DD') },
                      ...todoList?.todos?.slice(index + 1),
                    ])
                  }}
                  renderInput={(params) => {
                    const updatedParams = {
                      ...params,
                      inputProps: {
                        ...params.inputProps,
                        readOnly: true,
                      },
                    }
                    return (
                      <TextField
                        {...updatedParams}
                        helperText={
                          params?.inputProps?.value ? computeDueDate(params?.inputProps?.value) : ''
                        }
                      />
                    )
                  }}
                />
              </LocalizationProvider>
              <div>
                <Checkbox
                  color='success'
                  checked={todo.isCompleted}
                  onChange={(event) => {
                    setTodos([
                      // immutable update
                      ...todoList?.todos?.slice(0, index),
                      {
                        ...todo,
                        isCompleted: event.target.checked,
                      },
                      ...todoList?.todos?.slice(index + 1),
                    ])
                  }}
                />
                <Button
                  size='small'
                  color='secondary'
                  onClick={() => {
                    setTodos([
                      // immutable delete
                      ...todoList?.todos?.slice(0, index),
                      ...todoList?.todos?.slice(index + 1),
                    ])
                  }}
                >
                  <DeleteIcon />
                </Button>
              </div>
            </div>
          ))}
          <CardActions>
            <Button
              type='button'
              color='primary'
              onClick={() => {
                setTodos([...todoList?.todos, { title: '', isCompleted: false, dueDate: null }])
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
