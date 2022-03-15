const express = require('express')
const cors = require('cors')
const app = express()
// get MongoDB driver connection
const mongoDbClient = require('./database/mongoDbClient');

app.use(cors())
app.use(express.json())

const PORT = 3001

app.get('/', (req, res) => res.send('Hello World!'))

mongoDbClient.connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }

  app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
});