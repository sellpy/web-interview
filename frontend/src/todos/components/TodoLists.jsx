import React, { Fragment, useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
} from '@mui/material'
import ReceiptIcon from '@mui/icons-material/Receipt'
import { TodoListForm } from './TodoListForm'
import { TodoListsApi } from '../api/todoLists.model'

export const TodoLists = ({ style }) => {
  const [todoLists, setTodoLists] = useState({})
  const [activeList, setActiveList] = useState()

  useEffect(() => {
    const loadTodoLists = async () => {
      try {
        const lists = await TodoListsApi.fetchTodoLists()
        setTodoLists(lists)
      } catch (error) {
        console.error('Error loading todo lists:', error)
      }
    }

    loadTodoLists()
  }, [])

  if (!Object.keys(todoLists).length) return null
  return (
    <Fragment>
      <Card style={style}>
        <CardContent>
          <Typography component='h2'>My Todo Lists</Typography>
          <List>
            {Object.keys(todoLists).map((key) => (
              <ListItemButton key={key} onClick={() => setActiveList(key)}>
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary={todoLists[key].title} />
              </ListItemButton>
            ))}
          </List>
        </CardContent>
      </Card>
      {todoLists[activeList] && (
        <TodoListForm
          key={activeList}
          todoList={todoLists[activeList]}
          saveTodoList={(id, { todos }) => {
            const listToUpdate = todoLists[id]
            TodoListsApi.saveTodoList(id, listToUpdate.title, todos)
              .then(() => {
                setTodoLists({
                  ...todoLists,
                  [id]: { ...listToUpdate, todos },
                })
              })
              .catch((error) => {
                console.error('Error saving todo list:', error)
              })
          }}
        />
      )}
    </Fragment>
  )
}
