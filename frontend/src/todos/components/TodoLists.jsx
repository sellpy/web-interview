import React, { Fragment, useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Snackbar,
  Alert
} from '@mui/material'
import ReceiptIcon from '@mui/icons-material/Receipt'
import { TodoListForm } from './TodoListForm'
import {getPersonalTodos, patchTodosList} from "../../utils/fetchUtils";

export const TodoLists = ({ style }) => {
  const [todoLists, setTodoLists] = useState([]);
  const [activeListId, setActiveListId] = useState();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSeverity] = useState('info');

  useEffect(() => {
    getPersonalTodos()
      .then(setTodoLists)
      .catch(() => {
        setToastSeverity('error');
        setToastMessage('An error occurred when fetching the todos');
        setShowToast(true);
      })
  }, [setToastMessage, setToastSeverity, setShowToast]);

  if (!todoLists.length) return null

  const handleCloseToast = () => {
    setShowToast(false);
  };

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
      saveTodoList={(id, { todos }) => patchTodosList(id, {title: todoLists.find(todoList => todoList.id === activeListId).title, todos}).then(() => {
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
        });
        setToastSeverity('success');
        setToastMessage('Changes saved successfully');
        setShowToast(true);
      }).catch(() => {
        setToastSeverity('error');
        setToastMessage('An error occurred when attempting to save the changes');
        setShowToast(true);
      })}
    />}
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={showToast}
      autoHideDuration={2000}
      onClose={handleCloseToast}
    >
      <Alert onClose={handleCloseToast} severity={toastSeverity}>
        {toastMessage}
      </Alert>
    </Snackbar>
  </Fragment>
}
