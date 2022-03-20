const util = require('util');
const mongoDbClient = require('../database/mongoDbClient');
const ToDosService = require('../services/todosService');



describe('ToDos Service', () => {
  let ToDosServiceInstance;

  beforeAll(async () => {
    const connectToMongoDbServer = util.promisify(mongoDbClient.connectToServer);

    try {
      await connectToMongoDbServer();
      ToDosServiceInstance = new ToDosService();
    } catch(err) {
      console.error(err);
      process.exit();
    }

  });

  afterEach(async () => {
    await mongoDbClient.getDb().dropDatabase();
  })

  afterAll(async () => {
    await mongoDbClient.closeConnection();
  });

  it('should be able to create new todo lists', async () => {
    // Create ToDos List
    const createdToDosList = await ToDosServiceInstance.createToDosList('users', ["from test"]);

    const expectedToDosList = {title: 'users', todos: ["from test"]};

    expect(createdToDosList.title).toEqual(expectedToDosList.title);
    expect(createdToDosList.todos).toEqual(expectedToDosList.todos);
  });

  it('empty todos are filtered out when creating new todo lists', async () => {
    // Create ToDos List
    await ToDosServiceInstance.createToDosList('users', ["from test", '']);

    // Fetch ToDos Lists
    const fetchedToDosLists = await ToDosServiceInstance.getToDosLists();

    expect(fetchedToDosLists[0].todos).toHaveLength(1);
  });

  it('should be able to fetch todos lists', async () => {
    // Create ToDos List
    await ToDosServiceInstance.createToDosList('users', ["from test"]);

    // Fetch ToDos Lists
    const fetchedToDosLists = await ToDosServiceInstance.getToDosLists();

    const expectedToDosList = {title: 'users', todos: ["from test"]};


    expect(fetchedToDosLists).toHaveLength(1);
    expect(fetchedToDosLists[0].title).toEqual(expectedToDosList.title);
    expect(fetchedToDosLists[0].todos).toEqual(expectedToDosList.todos);
  });

  it('should be able to update a todo list', async () => {
    // Create ToDos List
    const createdToDosList = await ToDosServiceInstance.createToDosList('users', ["from test"]);

    // Update ToDos List
    await ToDosServiceInstance.updateToDosList(createdToDosList.id, createdToDosList.title, ["updated from test"]);

    // Fetch ToDos Lists
    const fetchedToDosLists = await ToDosServiceInstance.getToDosLists();

    const expectedToDosList = {title: 'users', todos: ["updated from test"]};

    expect(fetchedToDosLists[0].title).toEqual(expectedToDosList.title);
    expect(fetchedToDosLists[0].todos).toEqual(expectedToDosList.todos);
  });

  it('empty todos are filtered out when updating a todo list', async () => {
    // Create ToDos List
    const createdToDosList = await ToDosServiceInstance.createToDosList('users', ["from test"]);

    // Update ToDos List
    await ToDosServiceInstance.updateToDosList(createdToDosList.id, createdToDosList.title, ["from test", "updated from test", '']);

    // Fetch ToDos Lists
    const fetchedToDosLists = await ToDosServiceInstance.getToDosLists();

    expect(fetchedToDosLists[0].todos).toHaveLength(2);
  });
});