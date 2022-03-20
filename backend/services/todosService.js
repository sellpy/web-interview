const TodosDao = require('../daos/todosDao');
const ULID = require("ulid");

class TodosService {
  constructor () {
    this.ToDosDao = new TodosDao();
  }

  createToDosList(newToDoListTitle, newToDoListToDos) {
    const nonEmptyToDos = newToDoListToDos.filter(todo => todo.length > 0);

    const newToDo = {title: newToDoListTitle, todos: nonEmptyToDos, id: ULID.ulid()};

    return this.ToDosDao.createToDosList(newToDo).then(() => newToDo);
  }

  getToDosLists() {
    return this.ToDosDao.getToDosLists();
  }

  updateToDosList(todoListId, newToDoListTitle, newToDoListToDos) {
    const nonEmptyToDos = newToDoListToDos.filter(todo => todo.length > 0);

    return this.ToDosDao.updateToDosList(todoListId, newToDoListTitle, nonEmptyToDos);
  }
}

module.exports = TodosService;