import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

export function useTodoList() {
  const queryClient = useQueryClient()

  const [activeListId, setActiveListId] = useState()

  const {
    data: todoLists,
    isPending,
    isFetching,
    isError,
  } = useQuery({ queryKey: ['todos'], queryFn: getTodoLists })

  const mutation = useMutation({
    mutationFn: updateTodoLists,
    onSuccess: () => {
      queryClient.invalidateQueries(['todos'])
    },
  })

  function saveTodoList(id, { todos }) {
    const listToUpdate = todoLists[id]
    mutation.mutate({ ...listToUpdate, todos })
  }

  useEffect(() => {
    if (todoLists) {
      const firstTodoList = Object.keys(todoLists).at(0)
      setActiveListId(firstTodoList)
    }
  }, [todoLists])

  return {
    activeListId,
    isError,
    isFetching,
    isPending,
    saveTodoList,
    setActiveListId,
    todoLists,
  }
}

const API_URL = 'http://localhost:3001'

const getTodoLists = () => {
  return fetch(API_URL).then((res) => res.json())
}

const updateTodoLists = (todoList) => {
  return fetch(API_URL, {
    method: 'PUT',
    body: JSON.stringify(todoList),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json())
}
