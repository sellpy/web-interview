import React, { Fragment, useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
} from '@mui/material'
import ReceiptIcon from '@mui/icons-material/Receipt'
import { TodoListForm } from './TodoListForm'

const backendRootPath = 'http://localhost:3001/'

export const TodoLists = ({ style }) => {
  const [todoLists, setTodoLists] = useState({})
  const [activeList, setActiveList] = useState()
  const [saving, setSaving] = useState(false)

  const fetchTodoLists = () => {
    return fetch(backendRootPath)
    .then(res => {
      return res.json();
    })
    .then(data => {
      return data;
    });
  }

  const updateTodoList = (todoList) => {
    fetch(backendRootPath, {
      method: 'PUT',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(todoList)
    })
    .then(res => {
      setSaving(false)
    })
  }  

  useEffect(() => {
    fetchTodoLists().then(setTodoLists)
  }, [])

  if (!Object.keys(todoLists).length) return null
  return (
    <Fragment>
      <Card style={style}>
        <CardContent>
          <Typography component='h2'>My Todo Lists</Typography>
          <List>
            {Object.keys(todoLists).map((key) => (
              <ListItem key={key} onClick={() => setActiveList(key)}>
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary={todoLists[key].title} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
      {todoLists[activeList] && (
        <TodoListForm
          key={activeList} // use key to make React recreate component to reset internal state
          todoList={todoLists[activeList]}
          saving={saving}
          saveTodoList={(id, { todos }) => {
            setSaving(true)
            const listToUpdate = todoLists[id]
            const newTodoList = { ...listToUpdate, todos }
            setTodoLists({
              ...todoLists,
              [id]: newTodoList,
            })
            updateTodoList(newTodoList)
          }}
        />
      )}
    </Fragment>
  )
}
