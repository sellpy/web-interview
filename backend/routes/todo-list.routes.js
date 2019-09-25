const utils = require('./utils');

const baseRoute = '/todo-list';

const configureRoutes = (app, db) => {
    app.get(baseRoute, (req, res) => {
        utils.resultHandler(db.getTodoLists(), res);
    });
    
    app.get(baseRoute + '/:id', (req, res) => {
        utils.resultHandler(db.getTodoList(id), res);
    });
    
    app.get(baseRoute + '/:id/todo', (req, res) => {
        utils.resultHandler(db.getTodos(req.params.id), res);
    });

    app.post(baseRoute + '/:id/todo', (req, res) => {
        utils.resultHandler(db.addTodo(req.params.id), res);
    });

    app.post(baseRoute + '/:title', (req, res) => {
        utils.resultHandler(db.addTodoList(req.params.title), res);
    });

    app.delete(baseRoute + '/:title', (req, res) => {
        // TODO
    });

    app.put(baseRoute, (req, res) => {
        // TODO
    });
}

module.exports = configureRoutes;