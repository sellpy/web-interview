const express = require('express');
const cors = require('cors');
const app = express();
const JsonDB = require('node-json-db').JsonDB;
const Config = require('node-json-db/dist/lib/JsonDBConfig').Config;
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cors());

const PORT = 3001;
var db = new JsonDB(new Config('toDos', true, false, '/'));

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/toDos', (req, res) => {
  const toDos = db.getData('/');
  console.log('toDos', toDos);

  res.send(toDos);
});

app.post('/saveToDos', (req, res) => {
  console.log('Hello from post!');
  console.log(req);
  console.log('Req.body: ' + req.body);
  db.push('/', req.body);
  res.send(req.body.data);
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
