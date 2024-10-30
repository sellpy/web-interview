import React from 'react'
import { TextField, Button, Checkbox, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

export const TodoItem = ({ todo, index, onContentChange, onToggle, onDelete, onKeyDown }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Typography sx={{ margin: '8px' }} variant='h6'>
        {index + 1}
      </Typography>
      <TextField
        sx={{ flexGrow: 1, marginTop: '1rem' }}
        label='What to do?'
        value={todo.content || ''}
        onChange={(event) => onContentChange(event.target.value)}
        onKeyDown={onKeyDown}
      />
      <Checkbox sx={{ margin: '8px' }} checked={!!todo.completed} onChange={onToggle} />
      <Button sx={{ margin: '8px' }} size='small' color='secondary' onClick={onDelete}>
        <DeleteIcon />
      </Button>
    </div>
  )
}
