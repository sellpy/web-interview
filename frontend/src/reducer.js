import { combineReducers } from 'redux'
import todoReducer from './todos/reducer'

const reducers = {
  todos: todoReducer
}

export default combineReducers(reducers)
