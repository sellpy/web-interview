import { DoneAll, Receipt } from '@mui/icons-material'
import {
  Card,
  CardContent,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import React, { Fragment } from 'react'
import { useTodoList } from '../../hooks/useTodoList'
import { TodoListForm } from './TodoListForm'

export const TodoLists = ({ style }) => {
  const {
    activeListId,
    isError,
    isFetching,
    isPending,
    saveTodoList,
    setActiveListId,
    todoLists,
  } = useTodoList()

  if (isError) {
    return (
      <Card style={style} >
        <CardContent>
          <Typography component='h2'>Error</Typography>
          <Typography component='p'>Failed to load todo lists</Typography>
        </CardContent>
      </Card>
    )
  }

  if (isPending) {
    return (
      <Card style={style}>
        <CardContent>
          <Typography component='h2'>Loading...</Typography>
        </CardContent>
      </Card>
    )
  }

  const activeTodoList = todoLists[activeListId]

  return (
    <Fragment>
      <Card style={style}>
        <CardContent>
          <Typography component='h2'>My Todo Lists</Typography>
          <List>
            {Object.values(todoLists).map(({ id, todos, title }) => {
              const completedTodos = todos.filter((todo) => todo.status === 'done')
              const remainingTodos = todos.length - completedTodos.length
              const allTodosDone = todos.length === completedTodos.length
              const overDueTodos = todos.filter((todo) => new Date(todo.dueDate) < new Date())

              return (
                <ListItemButton
                  key={id}
                  onClick={() => {
                    setActiveListId(id)
                  }}
                >
                  <ListItemIcon>
                    <Receipt />
                  </ListItemIcon>
                  <ListItemText
                    primary={title}
                    secondary={`${completedTodos.length} completed / ${remainingTodos} remaining / ${overDueTodos.length} overdue`}
                  />
                  <ListItemIcon>
                    <DoneAll color={allTodosDone ? 'success' : 'disabled'} />
                  </ListItemIcon>
                </ListItemButton>
              )
            })}
          </List>
        </CardContent>
      </Card>

      {activeTodoList && (
        <TodoListForm
          key={activeTodoList.id} // use key to make React recreate component to reset internal state
          todoList={activeTodoList}
          saveTodoList={saveTodoList}
        />
      )}

      {isFetching && (
        <Card style={style}>
          <CardContent>
            <Typography component='p'>Fetching...</Typography>
          </CardContent>
        </Card>
      )}
    </Fragment>
  )
}
