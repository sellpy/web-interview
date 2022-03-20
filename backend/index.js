const express = require('express')
const cors = require('cors')

// get MongoDB driver connection
const mongoDbClient = require('./database/mongoDbClient');

const {createServer} = require("./server");

mongoDbClient.connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }

  const PORT = 3001;

  const server = createServer();

  server.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
});