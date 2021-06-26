import React, {
  useEffect, createContext, useCallback, useState, useContext,
} from 'react'

import exampleLists from './exampleLists.json'

const toDoContext = createContext()

export const useToDoContext = () => useContext(toDoContext)

export const ToDoContextProvider = ({ children }) => {
  const [toDoLists, setToDoLists] = useState({})
  const [activeListId, setActiveListId] = useState('')

  useEffect(() => {
    // Propagate context with initial data on load
    setToDoLists(exampleLists)
  }, [])

  const persistChanges = useCallback(
    (updatedList) => {
      setToDoLists({ ...toDoLists, [updatedList.id]: updatedList })
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
