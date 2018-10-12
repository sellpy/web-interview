import React from 'react'
import {compose, lifecycle, withStateHandlers, branch, renderNothing} from 'recompose'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ReceiptIcon from '@material-ui/icons/Receipt'
import Typography from '@material-ui/core/Typography'
import {ToDoListForm} from './ToDoListForm'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const getPersonalTodos = () => {
  return sleep(1000).then(() => Promise.resolve({
    '0000000001': {
      id: '0000000001',
      title: 'First List',
      todos: ['First todo of first list!']
    },
    '0000000002': {
      id: '0000000002',
      title: 'Second List',
      todos: ['First todo of second list!']
    }
  }))
}

export const ToDoLists = compose(
  withStateHandlers(
    {
      toDoLists: {},
      activeList: null
    },
    {
      saveToDoList: ({toDoLists}) => ({id, todos}) => {
        toDoLists[id].todos = todos
        return {toDoLists}
      },
      saveInitialState: () => (toDoLists) => ({
        toDoLists
      }),
      setActiveList: () => (listId) => ({
        activeList: listId
      })
    }
  ),
  lifecycle({
    componentDidMount () {
      getPersonalTodos()
        .then((toDoLists) => this.props.saveInitialState(toDoLists))
    }
  }),
  branch(
    ({toDoLists}) => Object.keys(toDoLists).length === 0,
    renderNothing
  )
)(({dispatch, toDoLists, saveToDoList, activeList, setActiveList, style}) => {
  return <div>
    <Card style={style}>
      <CardContent>
        <Typography
          variant='headline'
          component='h2'
        >
          My ToDo Lists
        </Typography>
        <List>
          {Object.keys(toDoLists).map((key) => <ListItem
            key={key}
            button
            onClick={() => setActiveList(key)}
          >
            <ListItemIcon>
              <ReceiptIcon />
            </ListItemIcon>
            <ListItemText primary={toDoLists[key].title} />
          </ListItem>)}
        </List>
      </CardContent>
    </Card>
    <ToDoListForm
      saveToDoList={saveToDoList}
      toDoList={toDoLists[activeList]}
      style={{margin: '1rem'}}
    />
  </div>
})
