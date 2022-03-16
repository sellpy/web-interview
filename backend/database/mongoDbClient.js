const config = require('config');
const { MongoClient } = require('mongodb');

const mongoDbConfig = config.get('BackendApp.mongoDB');

const client = new MongoClient(mongoDbConfig.database_address, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }

      dbConnection = db.db(mongoDbConfig.database_name);
      console.log('Successfully connected to MongoDB.');

      return callback();
    });
  },

  getDb: function () {
    return dbConnection;
  },
};