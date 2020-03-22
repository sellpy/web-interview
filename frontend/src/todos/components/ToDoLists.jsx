import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ReceiptIcon from '@material-ui/icons/Receipt';
import Typography from '@material-ui/core/Typography';
import { ToDoListForm } from './ToDoListForm';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const getPersonalTodos = async () => {
  // return sleep(1000).then(() =>
  //   Promise.resolve({
  //     '0000000001': {
  //       id: '0000000001',
  //       title: 'First List',
  //       todos: ['First todo of first list!']
  //     },
  //     '0000000002': {
  //       id: '0000000002',
  //       title: 'Second List',
  //       todos: ['First todo of second list!']
  //     }
  //   })
  // );
  try {
    let result = await axios({
      method: 'get',
      url: 'http://localhost:3001/toDos',
      // headers: {
      //   Authorization:
      //     'Basic ' +
      //     btoa(
      //       process.env.REACT_APP_USERNAME +
      //         ':' +
      //         process.env.REACT_APP_PASSWORD
      //     ),
      //   'Content-type': 'application/json'
      // },
      mode: 'cors'
    });
    console.log('saveData -> sampleRes', result);
    return result.data;
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
    } else if (error.request) {
      console.error(error.request);
    } else {
      console.error('Error', error.message);
    }
  }
};

const saveToDB = async toDoLists => {
  console.log(toDoLists);
  try {
    let sampleRes = await axios({
      method: 'post',
      url: 'http://localhost:3001/saveToDos',
      // headers: {
      //   Authorization:
      //     'Basic ' +
      //     btoa(
      //       process.env.REACT_APP_USERNAME +
      //         ':' +
      //         process.env.REACT_APP_PASSWORD
      //     ),
      //   'Content-type': 'application/json'
      // },
      mode: 'cors',
      data: toDoLists
    });
    console.log('saveData -> sampleRes', sampleRes);
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
    } else if (error.request) {
      console.error(error.request);
    } else {
      console.error('Error', error.message);
    }
  }
};

export const ToDoLists = ({ style }) => {
  const [toDoLists, setToDoLists] = useState({});
  const [activeList, setActiveList] = useState();

  useEffect(() => {
    getPersonalTodos().then(setToDoLists);
  }, []);

  useEffect(() => {
    console.log('ToDoLists were update with: ' + toDoLists);
    if (toDoLists !== {}) saveToDB(toDoLists);
  }, [toDoLists]);

  if (!Object.keys(toDoLists).length) return null;
  return (
    <Fragment>
      <Card style={style}>
        <CardContent>
          <Typography component='h2'>My ToDo Lists</Typography>
          <List>
            {Object.keys(toDoLists).map(key => (
              <ListItem key={key} button onClick={() => setActiveList(key)}>
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary={toDoLists[key].title} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
      {toDoLists[activeList] && (
        <ToDoListForm
          key={activeList} // use key to make React recreate component to reset internal state
          toDoList={toDoLists[activeList]}
          saveToDoList={(id, { todos }) => {
            console.log('I am run now!');
            const listToUpdate = toDoLists[id];
            setToDoLists({
              ...toDoLists,
              [id]: { ...listToUpdate, todos }
            });
          }}
        />
      )}
    </Fragment>
  );
};
