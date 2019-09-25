const loki = require('lokijs');
const uuid = require('uuid');
const TodoList = require('../models/TodoList');
const Todo = require('../models/Todo');

class TodoDatabase {
    constructor() {
        this.db = new loki('todo.db');
        this.todoLists = this.db.addCollection('todoLists');
        this.todos = this.db.addCollection('todos');
    }

    log() {
        console.log(this.todoLists.find());
    }
    
    logList(id) {
        console.log(this.todoLists.findOne({ 'id': id }));
    }

    logTodo(id) {
        console.log(this.todos.findOne({ 'id': id }));
    }

    addTodoList(title) {
        return !!title ? this.todoLists.insert(new TodoList(uuid(), title, [])) : null;
    }

    removeTodoList(id) {
        // TODO
    }

    getTodoLists() {
        let lists = this.todoLists.find();
        let result = {};
        lists.forEach(list =>
            result[list.id] = {
                ...list,
                todos: list.todos.map(todoId => this.todos.findOne({ 'id': todoId })),
            });
        return result;
    }

    getTodos(id) {
        let list = this.todoLists.findOne({ 'id': id });
        if (!list) return [];
        return list.todos.map(todoId => this.todos.findOne({ 'id': todoId }));
    };

    addTodo(listId) {
        let list = this.todoLists.findOne({ 'id': listId });
        if (!list) return null;
        let newTodo = this.todos.insert(new Todo(uuid(), '', false));
        list.todos.push(newTodo.id);
        this.todoLists.update(list);
        return newTodo;
    }

    removeTodo(id) {
        let todoToRemove = this.todos.findOne({ 'id': id });
        if (!!todoToRemove) {
            this.todoLists.findAndUpdate((list) => !!list.todos.indexOf(todoId => todoId === id),
                (list) => {
                    list.todos = list.todos.filter(todoId => todoId !== id);
                    return list;
                });
            this.todos.remove(todoToRemove);
        }
        return todoToRemove;
    }

    updateTodo(updatedTodo) {
        if (!updatedTodo || !updatedTodo.id) return null;
        let persistedTodo = this.todos.findOne({ 'id': updatedTodo.id });
        return !!persistedTodo ? this.todos.update({ ...persistedTodo, ...updatedTodo }) : null;
    }
}

module.exports = TodoDatabase;