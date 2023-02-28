const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

const PORT = 3001

let lists = {'0000000001': {
  id: '0000000001',
  title: 'First List',
  todos: [{
    name: 'First todo of first list!',
    completed: false
  }],
},
'0000000002': {
  id: '0000000002',
  title: 'Second List',
  todos: [{
    name: 'First todo of second list!',
    completed: false
  }],
}}

app.route('/')
  .get((req, res) => {
    res.send(lists)
  })
  .put((req, res) => {
    lists[req.body.id].todos = req.body.todos
    res.status(200).send("Updated todo list");
  })

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
