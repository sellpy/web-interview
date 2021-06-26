import React, {
  useEffect, createContext, useCallback, useState, useContext,
} from 'react'

import { getToDosFromServer, postToDosToServer } from './api'

const toDoContext = createContext()

export const useToDoContext = () => useContext(toDoContext)

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

export const ToDoContextProvider = ({ children }) => {
  const [toDoLists, setToDoLists] = useState({})
  const [activeListId, setActiveListId] = useState('')

  useEffect(() => {
    // Propagate context with initial data on load
    getPersonalTodos().then(setToDoLists)
  }, [])

  const persistChanges = useCallback(
    (updatedList) => {
      setToDoLists({ ...toDoLists, [updatedList.id]: updatedList })
      postToDosToServer(updatedList.id, updatedList.toDos)
    },
    [toDoLists, setToDoLists],
  )

  const createToDo = useCallback(
    (listId) => {
      const updatedList = toDoLists[listId]
      updatedList.toDos.push({ text: '', isCompleted: false })
      persistChanges(updatedList)
    },
    [toDoLists, persistChanges],
  )

  const updateToDoText = useCallback(
    (listId, toDoIndex, newValue) => {
      const updatedList = toDoLists[listId]
      updatedList.toDos[toDoIndex].text = newValue
      persistChanges(updatedList)
    },
    [toDoLists, persistChanges],
  )

  const toggleToDo = useCallback(
    (listId, toDoIndex) => {
      const updatedList = toDoLists[listId]
      const { isCompleted } = updatedList.toDos[toDoIndex]
      updatedList.toDos[toDoIndex].isCompleted = !isCompleted
      persistChanges(updatedList)
    },
    [toDoLists, persistChanges],
  )

  const deleteToDo = useCallback(
    (listId, toDoIndex) => {
      const updatedList = toDoLists[listId]
      updatedList.toDos.splice(toDoIndex, 1)
      persistChanges(updatedList)
    },
    [toDoLists, persistChanges],
  )

  return (
    <toDoContext.Provider
      value={{
        toDoLists,
        createToDo,
        updateToDoText,
        toggleToDo,
        deleteToDo,
        activeListId,
        setActiveListId,
      }}
    >
      {children}
    </toDoContext.Provider>
  )
}
