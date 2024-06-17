import { Delete } from '@mui/icons-material';
import { Checkbox, IconButton, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { differenceInCalendarDays, isBefore } from "date-fns";
import React from 'react';
import { isDateOverdue } from '../../utils/isDateOverdue';
import { DebouncedTextField } from './DebouncedTextField';

export function TodoItem({
  deleteTodo,
  dueDate,
  id,
  status,
  text,
  updateTodo,
}) {
  function handleChange(update) {
    const updatedTodo = {
      text,
      status,
      dueDate,
      ...update,
    };
    updateTodo(updatedTodo);
  }

  const statusIsDone = status === 'done';
  const isOverdue = !statusIsDone && isDateOverdue(dueDate);

  return (
    <div style={{
      display: 'flex',
      gap: '1rem',
      alignItems: 'center',
      justifyItems: 'space-between'
    }}
    >
      <Typography sx={{ margin: '8px' }} variant='h6'>
        {id + 1}
      </Typography>

      <DebouncedTextField
        aria-label='What to do?'
        label='What to do?'
        onChange={(newText) => handleChange({
          text: newText,
        })}
        sx={{ flexGrow: 1, marginTop: '1rem' }}
        value={text}
      />

      <DatePicker
        aria-label='Due date'
        displayWeekNumber={true}
        format='yyyy-MM-dd'
        label='Due date'
        onChange={(dueDate) => handleChange({
          dueDate,
          status: isBefore(dueDate, new Date()) ? 'done' : 'in-progress',
        })}
        slotProps={{
          textField: {
            helperText: isOverdue ? `${differenceInCalendarDays(new Date(), dueDate)} days overdue` : undefined,
          },
        }}
        sx={{ marginTop: '1rem' }}
        value={new Date(dueDate)}
      />

      <IconButton
        aria-label='Delete todo'
        color='error'
        onClick={() => {
          deleteTodo(id);
        }}
        size='small'
        sx={{ margin: '8px' }}
      >
        <Delete />
      </IconButton>

      <Checkbox
        aria-checked={statusIsDone}
        aria-label={statusIsDone ? 'Mark todo as done' : 'Mark todo as in-progress'}
        checked={statusIsDone}
        onChange={(event) => {
          handleChange({
            status: event.target.checked ? 'done' : 'in-progress',
          })
        }}
        size='small'
        sx={{ margin: '8px' }}
      />
    </div>
  );
}
