const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

const PORT = 3001

let data = {
  '0000000001': {
    id: '0000000001',
    title: 'First List',
    todos: [{
      title: 'First todo of first list!',
      completeDate: '2022-10-16',
      completed: false
    }],
  },
  '0000000002': {
    id: '0000000002',
    title: 'Second List',
    todos: [{
      title: 'First todo of second list!',
      completeDate: '2022-10-15',
      completed: false
    }],
  },
};

app.post("/settodos", (req, res) => {
  data = req.body;
  res.send();
});

app.get("/gettodos", (req, res) => {
  res.send(JSON.stringify(data));
})

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))