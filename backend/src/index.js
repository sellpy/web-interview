import express from 'express'
import cors from 'cors'
import fs from 'fs'

const app = express()

app.use(cors())
app.use(express.json())

const PORT = 3001

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))

const FILE_PATH = './data.json'

const readData = () => {
  try {
    const data = fs.readFileSync(FILE_PATH, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error when parsing data:', error)
    throw error
  }
}

app.get('/data', (req, res) => {
  const storedData = readData()
  res.json(storedData)
})

const saveData = (data) => {
  try {
    console.log('Saving data to data.json:', data)
    fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2))
  } catch (error) {
    console.error('Error saving data to data.json:', error)
  }
}
saveData()