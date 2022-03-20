const handleFetchErrors = (res) => {
  if (!res.ok) {
    throw new Error('Unsuccessful fetch response');
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
  }).then(handleFetchErrors);
}

module.exports = {
  getPersonalTodos,
  patchTodosList
}