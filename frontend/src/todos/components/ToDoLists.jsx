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
import { Button, Checkbox } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import Moment from "moment";

/********************************************************** */
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    // maxWidth: 360,
    marginRight: "50px",
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
  standardSpace: {
    margin: "0px",
  },
}));

/********************************************************** */
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getPersonalTodos = () => {
  return sleep(1000).then(() => MockApi.getAllItems());
};

export const ToDoLists = ({ style }) => {
  const [toDoLists, setToDoLists] = useState({});
  const [activeList, setActiveList] = useState();
  const [items, setItems] = useState({});
  const classes = useStyles();

  /********************************************************** */
  useEffect(() => {
    const fetchGetAllItems = async () => {
      const items = await ApiConfig.getAllItems();
      setItems(items);
    };
    fetchGetAllItems();
  }, []);

  useEffect(() => {
    getPersonalTodos().then(setToDoLists);
  }, []);

  /********************************************************** */
  const deleteItem = (item) => {
    console.log(item._id);
    const cleanItemList = items.filter((x) => x._id !== item._id);
    ApiConfig.deleteItem(item._id);

    setItems(cleanItemList);
  };

  /********************************************************** */
  const updateItem = async (e, newItem) => {
    let payload = newItem;

    e.stopPropagation();
    const updatedTodo = await ApiConfig.updateItem(payload._id, payload);

    setItems(
      items.map((item) => (item._id === payload._id ? updatedTodo : item))
    );
    console.log(items);
  };

  /********************************************************** */
  if (!Object.keys(toDoLists).length) return null;
  return (
    <Fragment>
      <Card style={style}>
        <CardContent>
          <Typography component="h2">My ToDo Lists</Typography>
          <List>
            {Object.keys(items).map((key) => (
              <div key={key} className={classes.root}>
                <ListItem key={key} button onClick={() => setActiveList(key)}>
                  <ListItemIcon>
                    <ReceiptIcon />
                  </ListItemIcon>
                  <ListItemText primary={items[key].title} />

                  <ListItemText
                    primary={`  ${Moment(items[key].created).format(
                      "YYYY-MM-DD"
                    )}`}
                  />

                  <ListItemIcon>
                    <Checkbox edge="start" checked={true} disableRipple />
                  </ListItemIcon>

                  <Button
                    size="small"
                    color="secondary"
                    className={classes.standardSpace}
                    onClick={() => {
                      deleteItem(items[key]);
                    }}
                  >
                    <DeleteIcon />
                  </Button>
                </ListItem>
              </div>
            ))}
          </List>
        </CardContent>
      </Card>
      {items[activeList] && (
        <ToDoListForm
          key={activeList}
          toDoList={items[activeList]}
          deleteItem={deleteItem}
          updateItem={updateItem}
        />
      )}
    </Fragment>
  );
};
