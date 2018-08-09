import {fromJS} from 'immutable'

const GET_PERSONAL_TODOS_LOADING = 'GET_PERSONAL_TODOS_LOADING'
export const GET_PERSONAL_TODOS_SUCCESS = 'GET_PERSONAL_TODOS_SUCCESS'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export const getPersonalTodos = () => {
  return async (dispatch) => {
    dispatch({type: GET_PERSONAL_TODOS_LOADING})
    await sleep(1000)
    dispatch({
      type: GET_PERSONAL_TODOS_SUCCESS,
      todos: fromJS({
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
      })
    })
  }
}

export const SET_ACTIVE_LIST = 'SET_ACTIVE_LIST'

export const setActiveList = (listId) => {
  return {type: SET_ACTIVE_LIST, listId}
}

export const SAVE_TODO_LIST = 'SAVE_TODO_LIST'

export const saveToDoList = ({listId, todos}) => {
  return async (dispatch) => {
    await sleep(1000)
    dispatch({type: SAVE_TODO_LIST, listId, todos: fromJS(todos)})
  }
}
