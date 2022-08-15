import React, { Fragment, useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Tooltip,
} from '@mui/material'
import ReceiptIcon from '@mui/icons-material/Receipt'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import { TodoListForm } from './TodoListForm'
import { fetchTodoLists, putTodoList } from './ApiComponent'

export const TodoLists = ({ style }) => {
  const [todoLists, setTodoLists] = useState({})
  const [activeList, setActiveList] = useState()

  useEffect(() => {
    fetchTodoLists().then(setTodoLists)
  }, [])

  const onSave = (id, todos) => {
    const listToUpdate = todoLists[id]
    setTodoLists({
      ...todoLists,
      [id]: { ...listToUpdate, todos },
    })
    putTodoList(id, todos)
  }

  const isListCompleted = (todoList) => {
    return todoList.todos.every((todo) => todo.completed)
  }

  if (!Object.keys(todoLists).length) return null
  return (
    <Fragment>
      <Card style={style}>
        <CardContent>
          <Typography component='h2'>My Todo Lists</Typography>
          <List>
            {Object.keys(todoLists).map((key) => (
              <ListItem key={key} button onClick={() => setActiveList(key)}>
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary={todoLists[key].title} />
                <ListItemIcon>
                  {isListCompleted(todoLists[key]) ? (
                    <Tooltip title='Todo list completed'>
                      <CheckCircleOutlineIcon />
                    </Tooltip>
                  ) : (
                    <Tooltip title='Todo list not completed'>
                      <RadioButtonUncheckedIcon />
                    </Tooltip>
                  )}
                </ListItemIcon>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
      {todoLists[activeList] && (
        <TodoListForm
          key={activeList} // use key to make React recreate component to reset internal state
          todoList={todoLists[activeList]}
          saveTodoList={(id, { todos }) => onSave(id, todos)}
        />
      )}
    </Fragment>
  )
}
