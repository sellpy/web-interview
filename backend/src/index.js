import express from 'express'
import cors from 'cors'
import { UserMessages } from './db.js'

export const app = express()

app.use(cors())
app.use(express.json())

const PORT = 3001

app.get('/', async (req, res, next) => {
  try {
    const message = await UserMessages.findOneAsync({ key: 'greeting' })
    res.send(message?.value)
  } catch (error) {
    next(error)
  }
})

if (import.meta.main) {
  app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
}
