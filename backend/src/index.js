const express = require('express')
const cors = require('cors')
const app = express()
const fs = require('fs')

app.use(cors())
app.use(express.json())

const PORT = 3001
const filePath = './data/todos.json'

app.get('/', (req, res) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.error(err)
        } else {
            res.send(data)
        }
    })
})

app.post('/', (req) => {
    fs.writeFile(filePath, JSON.stringify(req.body), function(err) {
        if (err) {
            console.error(err)
        }
    })
})

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
