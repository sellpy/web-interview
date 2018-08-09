import {combineReducers} from 'redux'
import {Map} from 'immutable'
import {
  GET_PERSONAL_TODOS_SUCCESS,
  SET_ACTIVE_LIST,
  SAVE_TODO_LIST
} from './actions'

const toDoLists = (state = Map(), action) => {
  switch (action.type) {
    case GET_PERSONAL_TODOS_SUCCESS: return action.todos
    case SAVE_TODO_LIST: {
      return state.setIn([action.listId, 'todos'], action.todos)
    }
    default: return state
  }
}

const activeToDoList = (state = null, {type, listId}) => {
  switch (type) {
    case SET_ACTIVE_LIST: return listId
    default: return state
  }
}

export default combineReducers({
  toDoLists,
  activeToDoList
})
