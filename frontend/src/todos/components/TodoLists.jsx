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
import TodoListRequests from '../../requests/todo-list.requests'

export const TodoLists = ({ style }) => {
  const [todoLists, setTodoLists] = useState([])
  const [activeList, setActiveList] = useState()

  useEffect(() => {
    const getTodoLists = async () => {
      const todoLists = await TodoListRequests.getTodoLists()
      if (todoLists) {
        setTodoLists(todoLists)
      }
    }

    getTodoLists()
  }, [])

  if (!todoLists.length) return null
  return (
    <Fragment>
      <Card style={style}>
        <CardContent>
          <Typography component='h2'>My Todo Lists</Typography>
          <List>
            {todoLists.map((todoList, index) => (
              <ListItem key={todoList._id} button onClick={() => setActiveList(index)}>
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary={todoList.title} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
      {todoLists[activeList] && (
        <TodoListForm
          key={activeList} // use key to make React recreate component to reset internal state
          todoList={todoLists[activeList]}
        />
      )}
    </Fragment>
  )
}
