const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

app.use(cors());

var corsOptions = {
  origin: "http://localhost:8081",
};

const db = require("./models/todo.model");
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

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.json({ message: "Welcome to todo application." });
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
