import React from 'react'
import {compose, lifecycle} from 'recompose'
import {connect} from 'react-redux'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ReceiptIcon from '@material-ui/icons/Receipt'
import Typography from '@material-ui/core/Typography'
import {getPersonalTodos, setActiveList} from '../actions'

export const ToDoLists = compose(
  connect((state) => ({
    toDoLists: state.todos.toDoLists
  })),
  lifecycle({
    componentDidMount () {
      this.props.dispatch(getPersonalTodos())
    }
  })
)(({dispatch, toDoLists, style}) => {
  return <Card style={style}>
    <CardContent>
      <Typography
        variant='headline'
        component='h2'
      >
        My ToDo Lists
      </Typography>
      <List>
        {toDoLists.map((toDoList, key) => <ListItem
          key={key}
          button
          onClick={() => dispatch(setActiveList(key))}
        >
          <ListItemIcon>
            <ReceiptIcon />
          </ListItemIcon>
          <ListItemText primary={toDoList.get('title')} />
        </ListItem>).toList()}
      </List>
    </CardContent>
  </Card>
})
