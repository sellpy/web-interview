import cors from 'cors'
import express from 'express'

const app = express()

app.use(cors())
app.use(express.json())

const PORT = 3001

// eslint-disable-next-line no-undef
const IN_MEMORY_DATABASE = new Map()

IN_MEMORY_DATABASE.set('0000000001', {
  id: '0000000001',
  title: 'First List',
  todos: [
    {
      text: 'First todo of first list!',
      status: 'done',
      dueDate: new Date('2024-06-18:23:59:59Z'),
    },
    {
      text: 'Second todo of first list!',
      status: 'in-progress',
      dueDate: new Date('2024-06-01:23:59:59Z'),
    },
  ],
})

IN_MEMORY_DATABASE.set('0000000002', {
  id: '0000000002',
  title: 'Second List',
  todos: [
    {
      text: 'First todo of second list!',
      status: 'in-progress',
      dueDate: new Date('2024-06-01:23:59:59Z'),
    },
  ],
})

app.get('/', async (_, res) => {
  const todoLists = Object.fromEntries(IN_MEMORY_DATABASE)

  res.send(todoLists)
})

app.put('/', async (req, res) => {
  const { id, title, todos } = req.body

  IN_MEMORY_DATABASE.set(id, {
    id,
    title,
    todos,
  })

  const todoLists = Object.fromEntries(IN_MEMORY_DATABASE)

  res.send(todoLists).status(400)
})

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
