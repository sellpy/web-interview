const mongoDbClient = require("../database/mongoDbClient");

class TodosDao {
  constructor () {
    this.mongoDbCollection = dbConnect => dbConnect.collection('todos');
  }

  createToDosList(newToDoList) {
    const dbConnect = mongoDbClient.getDb();

    return this.mongoDbCollection(dbConnect).insertOne(newToDoList);
  }

  updateToDosList(todoListId, title, todos) {
    const dbConnect = mongoDbClient.getDb();

    const updateQuery = {"id": todoListId};

    const updatedToDosList = {"$set": {title, todos}};

    return this.mongoDbCollection(dbConnect).updateOne(updateQuery, updatedToDosList);
  }

  getToDosLists() {
    const dbConnect = mongoDbClient.getDb();

    return this.mongoDbCollection(dbConnect)
      .find({})
      .limit(50)
      .toArray();
  }
}

module.exports = TodosDao;