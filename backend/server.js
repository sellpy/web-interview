const express = require("express");
const cors = require("cors");
const helmet = require("helmet");


function createServer() {
  const app = express()
  app.use(helmet())
  app.use(cors())
  app.use(express.json())
  app.use(require('./routes/todos'))

  // Global Error Handler
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).send({error: err.message});
  })

  app.get('/', (req, res) => res.send('Hello World!'))

  return app
}

module.exports = {
  createServer
}