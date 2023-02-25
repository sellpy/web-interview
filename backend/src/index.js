const express = require('express')
const cors = require('cors')
const app = express()

const { getTodoLists } = require('./controllers')

app.use(cors())
app.use(express.json())

const PORT = 3001

app.route('/todo-lists').get(getTodoLists)
// app.route('/todo').post(postTodo).put(putTodo).delete(delTodo)

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
