const handleFetchErrors = (res) => {
  if (!res.ok) {
    throw new Error('Unsuccessful data fetching');
  }

  return res;
}

const getPersonalTodos = () => {
  return fetch('http://localhost:3001/todos').then(handleFetchErrors).then(res => res.json())
}

const patchTodosList = (id, { title, todos }) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  return fetch(`http://localhost:3001/todos/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({title, todos}),
    headers
  });
}

module.exports = {
  getPersonalTodos,
  patchTodosList
}