import React, { useRef } from 'react'
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { TodoItem } from './TodoItem'
import { useTodos } from '../hooks/useTodos'

export const TodoListForm = ({ todoList, saveTodoList }) => {
  const newInputRef = useRef(null)
  const { todos, addTodo, updateTodo, toggleTodo, deleteTodo, updateTodoDueDate } = useTodos(
    todoList.todos,
    (todos) => saveTodoList(todoList.id, { todos })
  )

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault()
    }
  }

  const handleEnterPress = (event) => {
    if (event.key === 'Enter' && event.target.value) {
      event.preventDefault()
      handleSubmit()
      addTodo()
    }
  }

  return (
    <Card sx={{ margin: '0 1rem' }}>
      <CardContent>
        <Typography component='h2'>{todoList.title}</Typography>
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
        >
          {todos.map((todo, index) => (
            <TodoItem
              key={index}
              todo={todo}
              index={index}
              ref={index === todos.length - 1 ? newInputRef : null}
              onContentChange={(content) => updateTodo(index, content)}
              onToggle={() => toggleTodo(index)}
              onDelete={() => deleteTodo(index)}
              onKeyDown={handleEnterPress}
              onDueDateChange={(dueDate) => updateTodoDueDate(index, dueDate)}
            />
          ))}
          <CardActions>
            <Button type='button' color='primary' onClick={addTodo}>
              Add Todo <AddIcon />
            </Button>
            <Button type='submit' variant='contained' color='primary'>
              Save
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}
