import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  TextField,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Checkbox,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import Moment from "moment";
const useStyles = makeStyles({
  card: {
    margin: "1rem",
  },
  todoLine: {
    display: "flex",
    alignItems: "center",
  },
  textField: {
    flexGrow: 1,
  },
  standardSpace: {
    margin: "8px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
});

export const ToDoListForm = ({ toDoList, saveToDoList, deleteItem }) => {
  const classes = useStyles();
  const [todos, setTodos] = useState(toDoList.todos);

  const handleSubmit = (event) => {
    event.preventDefault();
    saveToDoList(toDoList.id, { todos });
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography component="h2">{toDoList.title}</Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          {todos.map(({ taskTitle }, index) => (
            <div key={index} className={classes.todoLine}>
              <Typography className={classes.standardSpace} variant="h6">
                {index + 1}
              </Typography>
              <TextField
                label="What to do?"
                value={taskTitle}
                onChange={(event) => {
                  setTodos([
                    // immutable update
                    ...todos.slice(0, index),
                    event.target.value,
                    ...todos.slice(index + 1),
                  ]);
                }}
                className={classes.textField}
              />
              <span style={{ padding: "5px", fontWeight: "bolder" }}>
                Created:
              </span>
              {/* {toDoList.created} {Moment(toDoList.created).format("YYYY-MM-DD hh:mm:ss")} */}
              {Moment(toDoList.created).format("YYYY-MM-DD")}
              <span style={{ paddingLeft: "15px", fontWeight: "bolder" }}>
                Compeleted:
              </span>{" "}
              <Checkbox checked={toDoList.completed}></Checkbox>
              <Button
                size="small"
                color="secondary"
                className={classes.standardSpace}
                onClick={() => {
                  deleteItem(toDoList._id);
                  //   setTodos([
                  //     // immutable delete
                  //     ...todos.slice(0, index),
                  //     ...todos.slice(index + 1),
                  //   ]);
                }}
              >
                <DeleteIcon />
              </Button>
            </div>
          ))}
          <CardActions>
            <Button
              type="button"
              color="primary"
              onClick={() => {
                setTodos([...todos, ""]);
              }}
            >
              Add Todo <AddIcon />
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  );
};
