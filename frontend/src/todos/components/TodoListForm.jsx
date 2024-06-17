import { Add } from '@mui/icons-material';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { addDays } from "date-fns";
import React from 'react';
import { TodoItem } from './TodoItem';

export const TodoListForm = ({ todoList, saveTodoList }) => {
  function handleUpdateTodo(updatedTodo, index) {
    const updatedTodos = [
      ...todoList.todos.slice(0, index),
      updatedTodo,
      ...todoList.todos.slice(index + 1),
    ];
    saveTodoList(todoList.id, { todos: updatedTodos });
  };

  function handleDeleteTodo(index) {
    const updatedTodos = [
      ...todoList.todos.slice(0, index),
      ...todoList.todos.slice(index + 1),
    ]
    saveTodoList(todoList.id, { todos: updatedTodos });
  };

  function handleAddTodo() {
    const updatedTodos = [
      ...todoList.todos,
      {
        text: '',
        status: 'in-progress',
        dueDate: new Date(addDays(new Date(), 7))
      }
    ];
    saveTodoList(todoList.id, { todos: updatedTodos });
  };

  return (
    <Card sx={{ margin: '0 1rem' }}>
      <CardContent>
        <Typography component='h2'>{todoList.title}</Typography>
        <section
          style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, }}
        >
          {todoList.todos.map(({ text, status, dueDate }, index) => (
            <TodoItem
              deleteTodo={(id) => handleDeleteTodo(id)}
              dueDate={dueDate}
              id={index}
              key={index}
              status={status}
              text={text}
              updateTodo={(updatedTodo) => handleUpdateTodo(updatedTodo, index)}
            />
          ))}

          <CardActions>
            <Button
              color='primary'
              onClick={() => handleAddTodo()}
              type='button'
            >
              Add Todo
              <Add />
            </Button>
          </CardActions>
        </section>
      </CardContent>
    </Card>
  )
}

