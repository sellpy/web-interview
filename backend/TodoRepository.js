const Todo = require("./models/todo.model");

class TodoRepository {
  constructor(model) {
    this.model = model;
  }

  create(title, todos, completed) {
    const newTodo = {
      title: title,
      todos: todos,
      completed: completed,
    };
    const todo = new this.model(newTodo);

    return todo.save();
  }

  findAll() {
    return this.model.find();
  }

  findById(id) {
    return this.model.findById(id);
  }

  deleteById(id) {
    return this.model.findByIdAndDelete(id);
  }

  updateById(id, object) {
    const query = { _id: id };
    return this.model.findOneAndUpdate(query, {
      $set: {
        title: object.title,
        todos: object.todos,
        completed: object.completed,
      },
    });
  }
}

module.exports = new TodoRepository(Todo);
