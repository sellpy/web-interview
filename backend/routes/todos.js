const express = require('express');
const { checkSchema, validationResult } = require('express-validator');
const ULID = require('ulid');

const router = express.Router();

// get MongoDB driver connection
const mongoDbClient = require('../database/mongoDbClient');

// Get ToDos Lists
router.route('/todos').get(async function (req, res) {
  const dbConnect = mongoDbClient.getDb();

  dbConnect
    .collection('todos')
    .find({})
    .limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send('Error fetching todos');
      } else {
        res.json(result);
      }
    });
});

// Create ToDos Lists
router.route('/todos').post(checkSchema({
    title: {
      notEmpty: true,
      errorMessage: "Todos list title cannot be empty"
    },
    todos: {
      notEmpty: true,
      errorMessage: "At least one todo is necessary"
    },
  }), async function (req, res) {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const dbConnect = mongoDbClient.getDb();

  const newToDo = {...req.body, id: ULID.ulid()};

  dbConnect
    .collection('todos')
    .insertOne(newToDo, function (err, result) {
      if (err) {
        res.status(400).send('Error creating todos');
      } else {
        res.json(result);
      }
    });
});

// Patch ToDos List
router.route('/todos/:todoListId').patch(checkSchema({
  title: {
    notEmpty: true,
    errorMessage: "Todos list title cannot be empty"
  },
  todos: {
    notEmpty: true,
    errorMessage: "At least one todo is necessary"
  },
}), async function (req, res) {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const dbConnect = mongoDbClient.getDb();

  const updateQuery = {"id": req.params.todoListId};

  const updatedToDosList = {"$set": {"title": req.body.title, "todos": req.body.todos}};

  dbConnect
    .collection('todos')
    .updateOne(updateQuery, updatedToDosList, function (err, result) {
      if (err) {
        res.status(400).send('Error patching todo');
      } else {
        res.json(result);
      }
    });
});

module.exports = router;