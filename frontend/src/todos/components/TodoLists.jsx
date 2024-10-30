import React, { Fragment, useState, useEffect, useRef, useCallback } from 'react'
import {
  Card,
  CardContent,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
  IconButton,
  Box,
  TextField,
} from '@mui/material'
import ReceiptIcon from '@mui/icons-material/Receipt'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import { TodoListForm } from './TodoListForm'
import { TodoListsApi } from '../api/todoLists.model'

export const TodoLists = ({ style }) => {
  const [todoLists, setTodoLists] = useState({})
  const [activeList, setActiveList] = useState()
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [newListName, setNewListName] = useState('')
  const inputRef = useRef(null)

  const loadTodoLists = useCallback(async () => {
    try {
      const lists = await TodoListsApi.fetchTodoLists()
      setTodoLists(lists)
    } catch (error) {
      console.error('Error loading todo lists:', error)
    }
  }, [])

  useEffect(() => {
    loadTodoLists()
  }, [loadTodoLists])

  useEffect(() => {
    if (isAddingNew) {
      inputRef.current?.focus()
    }
  }, [isAddingNew])

  const handleCreateNewList = async () => {
    if (!newListName.trim()) return

    try {
      await TodoListsApi.saveTodoList(Date.now().toString(), newListName.trim(), [])
      await loadTodoLists()
      setIsAddingNew(false)
      setNewListName('')
    } catch (error) {
      console.error('Error creating new todo list:', error)
    }
  }

  const cancelAddingNew = () => {
    setIsAddingNew(false)
    setNewListName('')
  }

  const handleDeleteList = async (id) => {
    try {
      await TodoListsApi.deleteTodoList(id)
      await loadTodoLists()
      if (activeList === id) {
        setActiveList(undefined)
      }
    } catch (error) {
      console.error('Error deleting todo list:', error)
    }
  }

  const handleSaveTodoList = async (id, { todos }) => {
    try {
      const listToUpdate = todoLists[id]
      setTodoLists((prevLists) => ({
        ...prevLists,
        [id]: {
          ...listToUpdate,
          todos,
        },
      }))

      await TodoListsApi.saveTodoList(id, listToUpdate.title, todos)
    } catch (error) {
      console.error('Error saving todo list:', error)
    }
  }

  if (!Object.keys(todoLists).length && !isAddingNew) return null
  return (
    <Fragment>
      <Card style={style}>
        <CardContent>
          <Box display='flex' alignItems='center' justifyContent='space-between' height='40px'>
            <Typography component='h2'>My Todo Lists</Typography>
            {!isAddingNew && (
              <IconButton
                color='primary'
                onClick={() => setIsAddingNew(true)}
                aria-label='create new todo list'
              >
                <AddIcon />
              </IconButton>
            )}
          </Box>
          <List>
            {Object.keys(todoLists).map((key) => (
              <ListItemButton
                key={key}
                onClick={() => setActiveList(key)}
                sx={{
                  position: 'relative',
                  '& .delete-button': {
                    display: 'none',
                    position: 'absolute',
                    right: 8,
                  },
                  '&:hover .delete-button': {
                    display: 'inline-flex',
                  },
                }}
              >
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary={todoLists[key].title} />
                <IconButton
                  className='delete-button'
                  color='error'
                  size='small'
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeleteList(key)
                  }}
                >
                  <DeleteIcon fontSize='small' />
                </IconButton>
              </ListItemButton>
            ))}
            {isAddingNew && (
              <Box display='flex' alignItems='center' gap={1} sx={{ mb: 1 }}>
                <TextField
                  ref={inputRef}
                  fullWidth
                  size='small'
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  placeholder='Enter list name'
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') handleCreateNewList()
                  }}
                  autoFocus
                />
                <IconButton
                  color='primary'
                  onClick={handleCreateNewList}
                  disabled={!newListName.trim()}
                >
                  <CheckIcon />
                </IconButton>
                <IconButton color='error' onClick={cancelAddingNew}>
                  <CloseIcon />
                </IconButton>
              </Box>
            )}
          </List>
        </CardContent>
      </Card>
      {todoLists[activeList] && (
        <TodoListForm
          key={activeList}
          todoList={todoLists[activeList]}
          saveTodoList={handleSaveTodoList}
        />
      )}
    </Fragment>
  )
}
