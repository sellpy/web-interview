const express = require('express');
const { checkSchema, validationResult } = require('express-validator');
const ToDosService = require('../services/todosService');

const ToDosServiceInstance = new ToDosService();


const router = express.Router();

// Get ToDos Lists
router.route('/todos').get(async function (req, res, next) {
  ToDosServiceInstance.getToDosLists().then(todoLists => {
    res.json(todoLists);
  }).catch(err => {
    next(err);
  });
});

// Create ToDos Lists
router.route('/todos').post(checkSchema({
    title: {
      notEmpty: true,
      errorMessage: "ToDos list title cannot be empty"
    },
    todos: {
      notEmpty: true,
      errorMessage: "At least one ToDo is necessary"
    },
  }), async function (req, res, next) {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  ToDosServiceInstance.createToDosList(req.body.title, req.body.todos).then(() => {
    res.status(201).send('ToDos list created successfully');
  }).catch(err => {
    next(err);
  });
});

// Patch ToDos List
router.route('/todos/:todoListId').patch(checkSchema({
  title: {
    notEmpty: true,
    errorMessage: "ToDos list title cannot be empty"
  },
  todos: {
    notEmpty: true,
    errorMessage: "At least one todo is necessary"
  },
}), async function (req, res, next) {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  ToDosServiceInstance.updateToDosList(req.params.todoListId, req.body.title, req.body.todos).then(() => {
    res.status(200).send('ToDos list updated successfully');
  }).catch(err => {
    next(err);
  });
});

module.exports = router;