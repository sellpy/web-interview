import express from 'express'
import cors from 'cors'
import Joi from 'joi'

const app = express()

app.use(cors())
app.use(express.json())

const PORT = 3001

const todoLists = {
  '0000000001': {
    id: '0000000001',
    title: 'First List',
    todos: [
      {
        title: 'First todo of first list!',
        isCompleted: true,
        dueDate: '2025-5-1',
      },
      {
        title: 'Second todo of first list!',
        isCompleted: true,
        dueDate: '2025-5-10',
      },
    ],
  },
  '0000000002': {
    id: '0000000002',
    title: 'Second List',
    todos: [
      {
        title: 'First todo of second list!',
        isCompleted: true,
        dueDate: '2025-5-5',
      },
      {
        title: 'Second todo of second list!',
        isCompleted: false,
        dueDate: '2025-5-15',
      },
    ],
  },
}

app.get('/todo-lists', (req, res) => res.status(200).json(todoLists))

app.post('/todo-lists/:id', (req, res) => {
  const { id } = req.params
  const updatedList = req.body

  if (!todoLists[id]) {
    return res.status(404).json({ status: 'error', message: 'Todo list not found' })
  }

  const todoListSchema = Joi.object({
    title: Joi.string().required(),
    todos: Joi.array()
      .items(
        Joi.object({
          title: Joi.string().allow('').required(),
          isCompleted: Joi.boolean().optional(),
          dueDate: Joi.string()
            .allow(null)
            .pattern(/^\d{4}-(0?[1-9]|1[0-2])-(0?[1-9]|[12]\d|3[01])$/)
            .optional(),
        })
      )
      .optional(),
  })

  const { error } = todoListSchema.validate(updatedList)

  if (error) {
    const details = error.details.map((err) => ({
      message: err.message,
      path: err.path,
    }))

    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors: details,
    })
  }

  todoLists[id] = {
    ...todoLists[id],
    ...updatedList,
  }

  res.status(200).json(todoLists[id])
})

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
