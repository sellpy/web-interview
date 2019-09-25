const express = require('express')
const TodoDatabase = require('./todo-database/todo-database');
const todoRoutes = require('./routes/todo.routes');
const todoListRoutes = require('./routes/todo-list.routes');
const bodyParser = require('body-parser');
const app = express()
const db = new TodoDatabase();

const PORT = 3001

app.use(bodyParser.json());
app.get('/', (req, res) => res.send('Hello World!'));
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE, OPTIONS');
    next();
});

todoRoutes(app, db);
todoListRoutes(app, db);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
