const express = require('express');
const { validationResult, body } = require('express-validator');
const ToDosService = require('../services/todosService');

const ToDosServiceInstance = new ToDosService();

const router = express.Router();

const todosSchemaValidations = [
  body('title').custom(value => typeof value === 'string').withMessage('The ToDos list title must be a string'),
  body('title').notEmpty().withMessage("ToDos list title cannot be empty"),
  body('todos').custom(value => Array.isArray(value)).withMessage('The todos property must be an array'),
  body('todos').custom(value => value.length > 0).withMessage('The todos property cannot be empty'),
  body('todos').custom(value => value.every(element => typeof element === 'string')).withMessage('Every ToDo must be a string'),
];

// Get ToDos Lists
router.route('/todos').get(async function (req, res, next) {
  ToDosServiceInstance.getToDosLists().then(todoLists => {
    res.json(todoLists);
  }).catch(err => {
    next(err);
  });
});

// Create ToDos Lists
router.route('/todos').post(...todosSchemaValidations, async function (req, res, next) {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  ToDosServiceInstance.createToDosList(req.body.title, req.body.todos).then((createdTodosList) => {
    res.status(201).json(createdTodosList);
  }).catch(err => {
    next(err);
  });
});

// Patch ToDos List
router.route('/todos/:todoListId').patch(...todosSchemaValidations, async function (req, res, next) {

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