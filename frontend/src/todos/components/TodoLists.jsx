import React, { Fragment, useState, useEffect } from 'react'
import { Card, CardContent, List, ListItem, ListItemText, ListItemIcon, Typography } from '@mui/material'
import ReceiptIcon from '@mui/icons-material/Receipt'
import { TodoListForm } from './TodoListForm'

const getPersonalTodos = () => {
  return fetch('http://localhost:3001/todos').then(res => res.json())
}

export const TodoLists = ({ style }) => {
  const [todoLists, setTodoLists] = useState({})
  const [activeListId, setActiveListId] = useState()

  useEffect(() => {
    getPersonalTodos()
      .then(setTodoLists)
  }, [])

  if (!todoLists.length) return null

  return <Fragment>
    <Card style={style}>
      <CardContent>
        <Typography
          component='h2'
        >
          My Todo Lists
        </Typography>
        <List>
          {todoLists.map((todoList) => <ListItem
            key={todoList.id}
            button
            onClick={() => setActiveListId(todoList.id)}
          >
            <ListItemIcon>
              <ReceiptIcon />
            </ListItemIcon>
            <ListItemText primary={todoList.title} />
          </ListItem>)}
        </List>
      </CardContent>
    </Card>
    {todoLists.find(todoList => todoList.id === activeListId) && <TodoListForm
      key={activeListId} // use key to make React recreate component to reset internal state
      todoList={todoLists.find(todoList => todoList.id === activeListId)}
      saveTodoList={(id, { todos }) => {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        fetch(`http://localhost:3001/todos/${id}`, {
          method: 'PATCH',
          body: JSON.stringify({todos, title: todoLists.find(todoList => todoList.id === activeListId).title}),
          headers
        }).then(() => {
          setTodoLists(todoLists => {
            return todoLists.map(todoList => {
              if (todoList.id !== id) {
                return todoList;
              }

              return {
                ...todoList,
                todos
              };
            })
          })
        })
      }}
    />}
  </Fragment>
}
