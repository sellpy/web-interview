const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const repository = require("./TodoRepository");
var bodyParser = require("body-parser");

var urlencodedParser = bodyParser.urlencoded({ extended: false });

/********************************************************** */
const PORT = process.env.PORT || 8080;

var corsOptions = {
  origin: "http://localhost:8080",
};

const app = express();
app.use(express.json());
app.use(cors());

/********************************************************** */
const db = require("./models/index");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

/********************************************************** */
app.get("/", (req, res) => {
  repository
    .findAll()
    .then((todos) => {
      res.json(todos);
    })
    .catch((error) => console.log(error));
});

/********************************************************** */
app.post("/", urlencodedParser, (req, res) => {
  const { title, todos, completed, date } = req.body;
  repository
    .create(title, todos, completed, date)
    .then((todo) => {
      res.json(todo);
    })
    .catch((error) => console.log(error));
});

/********************************************************** */
app.delete("/:id", (req, res) => {
  const { id } = req.params;
  repository
    .deleteById(id)
    .then((ok) => {
      console.log(ok);
      console.log(`Deleted record with id: ${id}`);
      res.status(200).json([]);
    })
    .catch((error) => console.log(error));
});
/********************************************************** */
app.put("/:id", (req, res) => {

  const { id } = req.params;
  const todo = {
    title: req.body.title,
    todos: req.body.todos,
    completed: req.body.completed,
  };
  repository
    .updateById(id, todo)
    .then(res.status(200).json(todo))
    .catch((error) => console.log(error));
});

/********************************************************** */
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
