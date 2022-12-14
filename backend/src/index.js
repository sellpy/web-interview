const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

const PORT = 3001

const todoLists = {
    '0000000001': {
        id: '0000000001',
        title: 'First List',
        todos: []
    },
    '0000000002': {
        id: '0000000002',
        title: 'Second List',
        todos: []
    },

}

app.get('/todo-lists', (req, res) => {
    res.send(todoLists)
})

app.delete('/todo-lists/:listId/items/:itemId', (req, res) => {
    const { listId, itemId } = req.params
    const todoList = todoLists[listId]

    if (Array.isArray(todoList.todos)) {
        todoList.todos.splice(itemId, 1)
    }

    res.send().status(200)
})

app.post('/todo-lists/:listId/items', (req, res) => {
    const { listId } = req.params
    const { todos } = req.body
    const todoList = todoLists[listId]

    if (todoList) {
        todoList['todos'] = todos
    }

    res.send().status(200)
})

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
