const TodosDao = require('../daos/todosDao');
const ULID = require("ulid");

class TodosService {
  constructor () {
    this.ToDosDao = new TodosDao();
  }

  createToDosList(newToDoListTitle, newToDoListToDos) {
    const newToDo = {title: newToDoListTitle, todos: newToDoListToDos, id: ULID.ulid()};

    return this.ToDosDao.createToDosList(newToDo).then(() => newToDo);
  }

  getToDosLists() {
    return this.ToDosDao.getToDosLists();
  }

  updateToDosList(todoListId, newToDoListTitle, newToDoListToDos) {
    return this.ToDosDao.updateToDosList(todoListId, newToDoListTitle, newToDoListToDos);
  }
}

module.exports = TodosService;