import { useState, useEffect } from 'react'
import { useDebounce } from '../../utils/hooks'

export const useTodos = (initialTodos, onSave) => {
  const [todos, setTodos] = useState(initialTodos)

  const debouncedSave = useDebounce((todos) => {
    onSave(todos)
  }, 400)

  useEffect(() => {
    debouncedSave(todos)
  }, [todos])

  const addTodo = () => {
    setTodos([...todos, { content: '', completed: false }])
  }

  const updateTodo = (index, content) => {
    setTodos([...todos.slice(0, index), { ...todos[index], content }, ...todos.slice(index + 1)])
  }

  const toggleTodo = (index) => {
    const newTodos = [...todos]
    newTodos[index] = {
      ...newTodos[index],
      completed: !newTodos[index].completed,
    }
    setTodos(newTodos)
  }

  const deleteTodo = (index) => {
    setTodos([...todos.slice(0, index), ...todos.slice(index + 1)])
  }

  return {
    todos,
    addTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
  }
}
