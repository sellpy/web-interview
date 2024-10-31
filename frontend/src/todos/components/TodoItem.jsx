import React, { useEffect, useRef, forwardRef } from 'react'
import { TextField, Checkbox, Typography, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { getInputLabel } from '../../utils/dateUtils'
import { getInputStyle } from '../styles/todoStyles'

export const TodoItem = forwardRef(
  (
    { todo, index, onContentChange, onToggle, onDelete, onKeyDown, onDueDateChange, isNew },
    ref
  ) => {
    const inputRef = useRef(ref)

    useEffect(() => {
      if (!todo.content && inputRef.current) {
        inputRef.current.focus()
      }
    }, [todo.content])

    return (
      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <Typography sx={{ margin: '8px' }} variant='h6'>
          {index + 1}
        </Typography>
        <TextField
          ref={inputRef}
          sx={{
            flexGrow: 1,
            marginTop: '1rem',
            ...getInputStyle(todo, isNew),
          }}
          label={getInputLabel(todo, isNew)}
          value={todo.content || ''}
          onChange={(event) => onContentChange(event.target.value)}
          onKeyDown={onKeyDown}
          error={!isNew && todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed}
        />

        {isNew && (
          <TextField
            type='datetime-local'
            label='Due Date'
            style={{ alignSelf: 'end' }}
            value={todo.dueDate ? todo.dueDate.slice(0, 16) : ''}
            onChange={(event) => {
              const newDate = event.target.value ? new Date(event.target.value).toISOString() : null
              onDueDateChange(newDate)
            }}
            sx={{ width: '200px' }}
            InputLabelProps={{ shrink: true }}
          />
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Checkbox checked={!!todo.completed} onChange={onToggle} />
          <IconButton
            size='small'
            onClick={onDelete}
            sx={{
              color: 'text.secondary',
              '&:hover': {
                color: 'error.main',
              },
            }}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    )
  }
)
