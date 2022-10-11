import React, { Fragment, useState, useEffect, useCallback } from 'react'
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
import { Check, Close } from '@mui/icons-material'

const fetchTodoLists = () => {
  return new Promise(async (resolve, reject) => {
    const res = await fetch("http://localhost:3001/gettodos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if(res.ok) {
      resolve(JSON.parse(await res.text()));
    } else {
      reject("Could not get data");
    }
  });
}

let changeTimer = null
const timeBeforeSave = 250

export const TodoLists = ({ style }) => {
  const [todoLists, setTodoLists] = useState({})
  const [activeList, setActiveList] = useState()
  const [changed, setChanged] = useState(false);

  useEffect(_ => {
    if (!changed) {
      return;
    }
    changeTimer != null && clearTimeout(changeTimer);
    changeTimer = setTimeout(() => {
      fetch("http://localhost:3001/settodos", {
        method: "POST",
        body: JSON.stringify(todoLists),
        headers: {
          "Content-Type": "application/json"
        }
      });
      setChanged(false);
      changeTimer = null
      }, timeBeforeSave)
    }, [todoLists, changed])

  const updateTodos = useCallback((todos) => {
    const id = todoLists[activeList].id;
    const listToUpdate = todoLists[id]
    const newData = {
      ...todoLists,
      [id]: { ...listToUpdate, todos },
    }
    setTodoLists(newData)
    setChanged(true)
  }, [activeList, todoLists])

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
              <ListItemButton key={key} onClick={() => setActiveList(key)}>
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary={todoLists[key].title} />
                {todoLists[key].todos.find(t => !t.completed)?<Close/>:<Check/>}
              </ListItemButton>
            ))}
          </List>
        </CardContent>
      </Card>
      {todoLists[activeList] && (
        <TodoListForm
          key={activeList} // use key to make React recreate component to reset internal state
          todoList={todoLists[activeList]}
          saveTodoList={updateTodos}
        />
      )}
    </Fragment>
  )
}
