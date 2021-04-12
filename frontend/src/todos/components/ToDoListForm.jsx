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

export const ToDoListForm = ({
  toDoList,
  saveToDoList,
  deleteItem,
  updateItem,
}) => {
  const classes = useStyles();
  const [todos, setTodos] = useState(toDoList.todos);
  const [check, setCheck] = useState(false);
  const [taskTitle1, setTaskTitle1] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("form submitted");
  };

  const handleCheck = (id, e, t) => {
    console.log(id);
    // update completed
    const updateTodo = {
      taskTitle: t.taskTitle,
      completed: !t.completed,
    };
    const modifiedList = todos.map((item) =>
      item._id === t._id ? updateTodo : item
    );
    setTodos(modifiedList);
    updateItem(e, manipulateItem(id, modifiedList));
  };

  const manipulateItem = (id, newTodos) => {
    return {
      _id: id,
      title: toDoList.title,
      compeleted: toDoList.compeleted,
      todos: newTodos,
    };
  };
  const addTodo = (e, id, todoItem) => {
    const updateTodo = {
      taskTitle: taskTitle1,
      completed: check,
    };
    todoItem.pop();
    todoItem.push(updateTodo);

    setTodos([...todos, todoItem]);
    updateItem(e, manipulateItem(id, todoItem));
  };
  const handleInput = (event) => {
    setTaskTitle1(event.target.value);
  };

  const deleteTodo = (id, e, todo) => {
    console.log(todo._id);
    const cleanList = todos.filter((item) => item._id !== todo._id);
    setTodos(cleanList);
    updateItem(e, manipulateItem(id, cleanList));
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography component="h2">{toDoList.title}</Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          {todos.map(({ taskTitle, completed, created }, index) => (
            <div key={index} className={classes.todoLine}>
              <Typography className={classes.standardSpace} variant="h6">
                {index + 1}
              </Typography>
              <TextField
                label="What to do?"
                value={taskTitle}
                onChange={(event) => handleInput(event)}
                className={classes.textField}
              />
              <span style={{ padding: "5px", fontWeight: "bolder" }}>
                Created:
              </span>
              {Moment(created).format("YYYY-MM-DD")}
              <span style={{ paddingLeft: "15px", fontWeight: "bolder" }}>
                Compeleted:
              </span>{" "}
              <Checkbox
                checked={completed}
                onClick={(e) => handleCheck(toDoList._id, e, todos[index])}
              ></Checkbox>
              <Button
                size="small"
                color="secondary"
                padding="50px"
                className={classes.standardSpace}
                onClick={(e) => {
                  deleteTodo(toDoList._id, e, todos[index]);
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
                setTodos([...todos, { id: "red" }]);
              }}
            >
              Add Todo <AddIcon />
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={(e) => addTodo(e, toDoList._id, todos)}
            >
              Save
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  );
};
