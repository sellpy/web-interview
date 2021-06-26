import React from 'react'
import { makeStyles } from '@material-ui/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import { DebounceInput } from 'react-debounce-input'
import { Button, Typography, TextField } from '@material-ui/core'
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined'
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined'

const useStyles = makeStyles({
  todoLine: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '0.6em',
  },
  numberLabel: {
    margin: '12px 24px',
  },
  input: { flexGrow: 1 },
})

export const ToDoItem = React.memo(
  ({
    toDo, toDoIndex, toDoListId, toggleToDo, deleteToDo, updateToDoText,
  }) => {
    const toDoClasses = useStyles()

    return (
      <div className={toDoClasses.todoLine}>
        <Typography className={toDoClasses.numberLabel} variant="h6">
          {toDoIndex + 1}
        </Typography>
        <DebounceInput
          type="text"
          label="What to do?"
          value={toDo.text}
          element={TextField}
          debounceTimeout={300} // Schedule onChange after 400ms of inactivity
          onChange={(event) => updateToDoText(toDoListId, toDoIndex, event.target.value)}
          className={toDoClasses.input}
        />
        <Button size="small" color="secondary" onClick={() => toggleToDo(toDoListId, toDoIndex)}>
          {toDo.isCompleted ? <CheckBoxOutlinedIcon /> : <CheckBoxOutlineBlankOutlinedIcon />}
        </Button>
        <Button size="small" color="secondary" onClick={() => deleteToDo(toDoListId, toDoIndex)}>
          <DeleteIcon />
        </Button>
      </div>
    )
  },
)
