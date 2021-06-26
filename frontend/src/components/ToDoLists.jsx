import React from 'react'
import Card from '@material-ui/core/Card'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ReceiptIcon from '@material-ui/icons/Receipt'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'

import { ToDoListForm } from './ToDoListForm'
import { useToDoContext } from '../util/context'

export const ToDoLists = () => {
  const { toDoLists, activeListId, setActiveListId } = useToDoContext()

  if (!Object.keys(toDoLists).length) {
    return <Typography component="h2">Nothing to show. Is the server running?</Typography>
  }
  return (
    <>
      <Card>
        <CardContent>
          <Typography component="h2">My ToDo Lists</Typography>
          <List>
            {Object.keys(toDoLists).map((key) => (
              <ListItem key={key} button onClick={() => setActiveListId(key)}>
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary={toDoLists[key].title} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
      {toDoLists[activeListId] && (
        <ToDoListForm
          key={activeListId} // use key to make React recreate component to reset internal state
          toDoList={toDoLists[activeListId]}
        />
      )}
    </>
  )
}
