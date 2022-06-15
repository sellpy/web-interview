require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const connectDB = require('./config/db.config')
const seedDBIfEmpty = require('./config/seed-db.config')
const router = require('./routers/index')

connectDB()
seedDBIfEmpty()

app.use(cors())
app.use(express.json())

const PORT = 3001

app.use(router)

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
