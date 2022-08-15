const express = require('express')
const cors = require('cors')
const app = express()

let db = {
  '0000000001': {
    id: '0000000001',
    title: 'First List',
    todos: [
      {
        todo: 'First todo item of first list!',
        completed: false,
      },
      {
        todo: 'Second todo item of first list!',
        completed: true,
      },
    ],
  },
  '0000000002': {
    id: '0000000002',
    title: 'Second List',
    todos: [
      {
        todo: 'First todo item of second list!',
        completed: false,
      },
    ],
  },
}

app.use(cors())
app.use(express.json())

const PORT = 3001

app.get('/lists', (req, res) => {
  res.status(200).send(db)
})
app.put('/lists/:todolistid', (req, res) => {
  db[req.params.todolistid].todos = req.body
  res.sendStatus(200)
})

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
