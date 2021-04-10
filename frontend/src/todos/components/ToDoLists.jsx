import React, { Fragment, useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ReceiptIcon from "@material-ui/icons/Receipt";
import Typography from "@material-ui/core/Typography";
import { ToDoListForm } from "./ToDoListForm";
import MockApi from "../../MockApi";
import ApiConfig from "../../ApiConfig";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getPersonalTodos = () => {
  return sleep(1000).then(() => MockApi.getAllItems());
};

export const ToDoLists = ({ style }) => {
  const [toDoLists, setToDoLists] = useState({});
  const [activeList, setActiveList] = useState();
  const [items, setItems] = useState({});

  useEffect(() => {
    const fetchGetAllItems = async () => {
      const items = await ApiConfig.getAllItems();
      console.log(items);
      setItems(items);
    };
    fetchGetAllItems();
  }, []);

  useEffect(() => {
    getPersonalTodos().then(setToDoLists);
  }, []);

  if (!Object.keys(toDoLists).length) return null;
  return (
    <Fragment>
      <Card style={style}>
        <CardContent>
          <Typography component="h2">My ToDo Lists</Typography>
          <List>
            {Object.keys(items).map((key) => (
              <ListItem key={key} button onClick={() => setActiveList(key)}>
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary={items[key].title} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
      {items[activeList] && (
        <ToDoListForm
          key={activeList} // use key to make React recreate component to reset internal state
          toDoList={items[activeList]}
          saveToDoList={(id, { todos }) => {
            const listToUpdate = items[id];
            setItems({
              ...items,
              [id]: { ...listToUpdate, todos },
            });
          }}
        />
      )}
    </Fragment>
  );
};
