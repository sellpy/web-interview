const { TodoListModel, TodoModel } = require('../models')

const seedDBIfEmpty = async () => {
  try {
    const todoLists = await TodoListModel.find()
    if (todoLists.length === 0) {
      const todoLists = await TodoListModel.insertMany([
        {
          title: 'First List',
          todos: [],
        },
        {
          title: 'Second List',
          todos: [],
        },
      ])

      await TodoModel.insertMany([
        {
          todoList: todoLists[0]._id,
          title: 'First todo of first list!',
          deadline: new Date(Date.now() + 1000 * 60 * 60),
        },
        {
          todoList: todoLists[1]._id,
          title: 'First todo of second list!',
          deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        },
      ])

      console.log('Seeded DB with 2 todo lists.')
    }
  } catch (error) {
    console.log(`An error occured while seeding the DB: ${error}`)
  }
}

module.exports = seedDBIfEmpty
