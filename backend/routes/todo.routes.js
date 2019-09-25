const utils = require('./utils');

const baseRoute = '/todo';

const configureRoutes = (app, db) => {
    app.post(baseRoute + '/:listId', (req, res) => {
        utils.resultHandler(db.addTodo(req.params.listId), res);
    });

    app.put(baseRoute, (req, res) => {
        utils.resultHandler(db.updateTodo(req.body), res);
    });

    app.delete(baseRoute + '/:id', (req, res) => {
        utils.resultHandler(db.removeTodo(req.params.id), res);
    });

    app.get(baseRoute, (req, res) => {
        // TODO
    });

    // DEV DEBUG
    let firstList = db.addTodoList('First todo list');
    let secondList = db.addTodoList('Second todo list');
    let todoOneOne = db.addTodo(firstList.id);
    let todoOneTwo = db.addTodo(firstList.id);
    let todoTwoOne = db.addTodo(secondList.id);
    let todoTwoTwo = db.addTodo(secondList.id);
    todoOneOne.title = "Bake bread";
    todoOneTwo.title = "Eat bread";
    todoTwoOne.title = "Feed cat";
    todoTwoTwo.title = "Pet cat";
    db.updateTodo(todoOneOne)
    db.updateTodo(todoOneTwo)
    db.updateTodo(todoTwoOne)
    db.updateTodo(todoTwoTwo)
}

module.exports = configureRoutes;