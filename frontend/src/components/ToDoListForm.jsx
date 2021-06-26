import React from 'react'
import {
  Card, CardContent, CardActions, Button, Typography,
} from '@material-ui/core'
import { v4 as uuidv4 } from 'uuid'
import AddIcon from '@material-ui/icons/Add'
import { makeStyles } from '@material-ui/styles'

import { ToDoItem } from './ToDoItem'
import { useToDoContext } from '../util/context'

const useStyles = makeStyles({
  card: {
    marginTop: '1rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  cardActions: {
    marginTop: '1em',
    justifyContent: 'flex-end',
  },
})

export const ToDoListForm = React.memo(({ toDoList }) => {
  const formClasses = useStyles()
  const {
    createToDo, toggleToDo, deleteToDo, updateToDoText,
  } = useToDoContext()

  return (
    <Card className={formClasses.card} key={uuidv4()}>
      <CardContent>
        <Typography component="h2">{toDoList.title}</Typography>
        <form className={formClasses.form}>
          {toDoList.toDos.map((toDo, toDoIndex) => (
            <ToDoItem
              key={uuidv4()}
              toDo={toDo}
              toDoIndex={toDoIndex}
              toDoListId={toDoList.id}
              toggleToDo={toggleToDo}
              deleteToDo={deleteToDo}
              updateToDoText={updateToDoText}
            />
          ))}
          <CardActions className={formClasses.cardActions}>
            <Button type="button" color="primary" onClick={() => createToDo(toDoList.id)}>
              Add Todo
              <AddIcon />
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
})
