const mongoDbClient = require("../database/mongoDbClient");
const {IoError, ApiError, NotFoundError} = require("../utils/error");

class TodosDao {
  constructor () {
    this.mongoDbCollection = dbConnect => dbConnect.collection('todos');
  }

  async createToDosList(newToDoList) {
    const dbConnect = mongoDbClient.getDb();

    try {
      return await this.mongoDbCollection(dbConnect).insertOne(newToDoList);
    } catch (err) {
      throw new IoError('An error occurred when creating the todos list', {cause: err});
    }
  }

  async updateToDosList(todosListId, title, todos) {
    const dbConnect = mongoDbClient.getDb();

    const updateQuery = {"id": todosListId};

    const updatedToDosList = {"$set": {title, todos}};

    try {
      const updateResult = await this.mongoDbCollection(dbConnect).updateOne(updateQuery, updatedToDosList);
      if (updateResult.matchedCount === 0) {
        throw new NotFoundError('Invalid todos list id ' + todosListId);
      }
      return;
    } catch (err) {
      if (err instanceof ApiError) {
        throw err;
      } else {
        throw new IoError('An error occurred when updating the todos list', {cause: err});
      }
    }
  }

  async getToDosLists() {
    const dbConnect = mongoDbClient.getDb();

    try {
      return await this.mongoDbCollection(dbConnect)
        .find({})
        .limit(50)
        .toArray();
    } catch (err) {
      console.error(err.stack);
      throw new IoError('An error occurred when fetching the todos lists', {cause: err});
    }
  }
}

module.exports = TodosDao;