import React, { Fragment, useState, useEffect } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ReceiptIcon from '@material-ui/icons/Receipt'
import Typography from '@material-ui/core/Typography'
import { ToDoListForm } from './ToDoListForm'
import { Checkbox } from '@material-ui/core';
import axios from 'axios';

const getPersonalTodos = () => {
  return axios.get('http://localhost:3001/todo-list')
  	.then(res => res.data);
}

export const ToDoLists = ({ style }) => {
  const [toDoLists, setToDoLists] = useState({})
  const [activeList, setActiveList] = useState()
  const updateLists = (updatedTodos) => {
    setToDoLists({
      ...toDoLists,
      [activeList]: {
        ...toDoLists[activeList],
        todos: updatedTodos
      }
    })
  }
  useEffect(() => {
    getPersonalTodos()
      .then(setToDoLists)
  }, []);


  if (!Object.keys(toDoLists).length) return null
  return <Fragment>
    <Card style={style}>
      <CardContent>
        <Typography
          variant='headline'
          component='h2'
        >
          My ToDo Lists
        </Typography>
        <List>
          {Object.keys(toDoLists).map((key) => <ListItem
            key={key}
            button
            onClick={() => setActiveList(key)}
          >
            <ListItemIcon>
              <ReceiptIcon />
            </ListItemIcon>
            <ListItemText primary={toDoLists[key].title} />
            <Checkbox
              checked={toDoLists[key].todos.every(todo => todo.done)}
            ></Checkbox>
          </ListItem>)}
        </List>
      </CardContent>
    </Card>
    {toDoLists[activeList] && <ToDoListForm
      key={activeList} // use key to make React recreate component to reset internal state
      toDoList={toDoLists[activeList]}
      onUpdate={updateLists}
    />}
  </Fragment>
}
