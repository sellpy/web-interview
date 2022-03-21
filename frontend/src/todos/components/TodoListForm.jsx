import React, {useCallback, useState} from 'react'
import { TextField, Card, CardContent, CardActions, Button, Typography} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import { Tooltip } from '@mui/material';
import {todoStatus} from "../../utils/models/todos";
import styled from "@emotion/styled";
import Checkbox from '@mui/material/Checkbox';


const StyledToDoButtonsContainer = styled.div(() => ({
  display: 'flex',
  padding: '8px',
  gap: '8px'
}))

export const TodoListForm = ({ todoList, saveTodoList }) => {
  const [todos, setTodos] = useState(todoList.todos)

  const handleSubmit = event => {
    event.preventDefault()
    saveTodoList(todoList.id, { todos })
  };

  const toggleToDoStatus = useCallback(todoIndexToToggle => {
    setTodos(currentToDos => {
      return currentToDos.map((todo, index) => {
        if (index !== todoIndexToToggle) {
          return todo;
        }

        return {
          ...todo,
          status: todo.status === todoStatus.Pending ? todoStatus.Completed : todoStatus.Pending
        }
      })
    })
  }, [setTodos]);


  return (
    <Card sx={{margin: '0 1rem'}}>
      <CardContent>
        <Typography component='h2'>
          {todoList.title}
        </Typography>
        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', flexGrow: 1}}>
          {todos.map((todo, index) => (
            <div key={index} style={{display: 'flex', alignItems: 'center'}}>
              <Typography sx={{margin: '8px'}} variant='h6'>
                {index + 1}
              </Typography>
              <TextField
                sx={{flexGrow: 1, marginTop: '1rem', textDecoration: todo.status === todoStatus.Completed ? 'line-through': 'auto'}}
                label='What to do?'
                value={todo.task}
                onChange={event => {
                  setTodos([ // immutable update
                    ...todos.slice(0, index),
                    // Editing a ToDo will reset its status to Pending
                    {task: event.target.value, status: todoStatus.Pending},
                    ...todos.slice(index + 1)
                  ])
                }}
              />
              <StyledToDoButtonsContainer>
                <Tooltip arrow title="status" placement="top">
                  <Checkbox inputProps={{ 'aria-label': 'todo status' }} checked={todo.status === todoStatus.Completed} color="secondary" onChange={() => toggleToDoStatus(index)} />
                </Tooltip>
                <Tooltip arrow title="delete" placement="top">
              <Button
                sx={{minWidth: '0px'}}
                size='small'
                color='secondary'
                onClick={() => {
                  setTodos([ // immutable delete
                    ...todos.slice(0, index),
                    ...todos.slice(index + 1)
                  ])
                }}
              >
                <DeleteIcon />
              </Button>
                </Tooltip>
              </StyledToDoButtonsContainer>
            </div>
          ))}
          <CardActions>
            <Button
              type='button'
              color='primary'
              onClick={() => {
                setTodos([...todos, {task: '', status: todoStatus.Pending}])
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
