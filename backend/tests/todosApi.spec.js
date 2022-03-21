const request = require('supertest');
const {createServer} = require("../server");
const util = require("util");
const mongoDbClient = require("../database/mongoDbClient");
const {todoStatus} = require("../utils/models/todos");

describe('ToDos Endpoints', () => {
  beforeAll(async () => {
    const connectToMongoDbServer = util.promisify(mongoDbClient.connectToServer);

    try {
      await connectToMongoDbServer();
    } catch(err) {
      console.error(err);
      process.exit();
    }

  });

  afterEach(async () => {
    await mongoDbClient.getDb().dropDatabase();
  });

  afterAll(async () => {
    await mongoDbClient.closeConnection();
  });

  it('should create a new todo list', async () => {
    const server = createServer();

    const createTodosListPayload = {
      title: "from test!",
      todos: [{task: 'test is cool', status: todoStatus.Pending}],
    };

    const res = await request(server)
      .post('/todos')
      .send(createTodosListPayload);

    expect(res.statusCode).toEqual(201);
    expect(res.body.title).toEqual(createTodosListPayload.title);
    expect(res.body.todos).toEqual(createTodosListPayload.todos);
  });

  it('fails to create a new todo list and returns 400 Bad Request if the ToDos List title is empty', async () => {
    const server = createServer();

    const createTodosListPayload = {
      title: "",
      todos: ['test is cool'],
    };

    const res = await request(server)
      .post('/todos')
      .send(createTodosListPayload);

    expect(res.statusCode).toEqual(400);
  });

  it('fails to create a new todo list and returns 400 Bad Request if the ToDos List title is not a string', async () => {
    const server = createServer();

    const createTodosListPayload = {
      title: {ok: 'not ok'},
      todos: ['test is cool'],
    };

    const res = await request(server)
      .post('/todos')
      .send(createTodosListPayload);

    expect(res.statusCode).toEqual(400);
  });

  it('fails to create a new todo list and returns 400 Bad Request if the ToDos List todos is empty', async () => {
    const server = createServer();

    const createTodosListPayload = {
      title: "from test!",
      todos: [],
    };

    const res = await request(server)
      .post('/todos')
      .send(createTodosListPayload);

    expect(res.statusCode).toEqual(400);
  });

  it('fails to create a new todo list and returns 400 Bad Request if the ToDos List todos is not an array', async () => {
    const server = createServer();

    const createTodosListPayload = {
      title: "from test!",
      todos: 'from test',
    };

    const res = await request(server)
      .post('/todos')
      .send(createTodosListPayload);

    expect(res.statusCode).toEqual(400);
  });

  it('fails to create a new todo list and returns 400 Bad Request if the ToDos List todos do not have a valid shape', async () => {
    const server = createServer();

    const createTodosListPayload = {
      title: "from test!",
      todos: [{ok: 'from test'}],
    };

    const res = await request(server)
      .post('/todos')
      .send(createTodosListPayload);

    expect(res.statusCode).toEqual(400);
  });

  it('fails to create a new todo list and returns 400 Bad Request if the todo status is invalid', async () => {
    const server = createServer();

    const createTodosListPayload = {
      title: "from test!",
      todos: [{task: 'from test', status: 'invalid'}],
    };

    const res = await request(server)
      .post('/todos')
      .send(createTodosListPayload);

    expect(res.statusCode).toEqual(400);
  });

  it('should fetch todos lists', async () => {
    const server = createServer();

    const createTodosListPayload = {
      title: "from test!",
      todos: [{task: 'test is cool', status: todoStatus.Pending}],
    };

    // Create ToDos List
    await request(server)
      .post('/todos')
      .send(createTodosListPayload);

    const res = await request(server)
      .get('/todos')
      .send();

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].title).toEqual(createTodosListPayload.title);
    expect(res.body[0].todos).toEqual(createTodosListPayload.todos);
  });

  it('should patch a todos list', async () => {
    const server = createServer();

    // Create ToDos List
    const createTodosListResponse = await request(server)
      .post('/todos')
      .send({
        title: "from test!",
        todos: [{task: 'test is cool', status: todoStatus.Pending}],
      });

    const patchTodosListPayload = {
      title: "patched from test!",
      todos: [{task: 'patching works', status: todoStatus.Completed}],
    };

    // Patch ToDos List
    const patchResponse = await request(server)
      .patch(`/todos/${createTodosListResponse.body.id}`)
      .send(patchTodosListPayload);

    expect(patchResponse.statusCode).toEqual(200);

    // Fetch todos lists
    const fetchedLists = await request(server)
      .get('/todos')
      .send();

    expect(fetchedLists.body).toHaveLength(1);
    expect(fetchedLists.body[0].title).toEqual(patchTodosListPayload.title);
    expect(fetchedLists.body[0].todos).toEqual(patchTodosListPayload.todos);
  });

  it('fails to patch a todo list and returns 400 Bad Request if the ToDos List title is empty', async () => {
    const server = createServer();

    // Create ToDos List
    const createTodosListResponse = await request(server)
      .post('/todos')
      .send({
        title: "from test!",
        todos: [{task: 'test is cool', status: todoStatus.Pending}],
      });

    const patchTodosListPayload = {
      title: "",
      todos: ['patching works'],
    };

    // Patch ToDos List
    const patchResponse = await request(server)
      .patch(`/todos/${createTodosListResponse.body.id}`)
      .send(patchTodosListPayload);

    expect(patchResponse.statusCode).toEqual(400);
  });

  it('fails to patch a todo list and returns 400 Bad Request if the ToDos List title is not a string', async () => {
    const server = createServer();

    // Create ToDos List
    const createTodosListResponse = await request(server)
      .post('/todos')
      .send({
        title: "from test!",
        todos: [{task: 'test is cool', status: todoStatus.Pending}],
      });

    const patchTodosListPayload = {
      title: {ok: 'not ok'},
      todos: ['patching works'],
    };

    // Patch ToDos List
    const patchResponse = await request(server)
      .patch(`/todos/${createTodosListResponse.body.id}`)
      .send(patchTodosListPayload);

    expect(patchResponse.statusCode).toEqual(400);
  });

  it('fails to patch a todo list and returns 400 Bad Request if the ToDos List todos is empty', async () => {
    const server = createServer();

    // Create ToDos List
    const createTodosListResponse = await request(server)
      .post('/todos')
      .send({
        title: "from test!",
        todos: [{task: 'test is cool', status: todoStatus.Pending}],
      });

    const patchTodosListPayload = {
      title: {ok: 'not ok'},
      todos: [],
    };

    // Patch ToDos List
    const patchResponse = await request(server)
      .patch(`/todos/${createTodosListResponse.body.id}`)
      .send(patchTodosListPayload);

    expect(patchResponse.statusCode).toEqual(400);
  });

  it('fails to patch a todo list and returns 400 Bad Request if the ToDos List todos is not an array', async () => {
    const server = createServer();

    // Create ToDos List
    const createTodosListResponse = await request(server)
      .post('/todos')
      .send({
        title: "from test!",
        todos: [{task: 'test is cool', status: todoStatus.Pending}],
      });

    const patchTodosListPayload = {
      title: {ok: 'not ok'},
      todos: 'from test',
    };

    // Patch ToDos List
    const patchResponse = await request(server)
      .patch(`/todos/${createTodosListResponse.body.id}`)
      .send(patchTodosListPayload);

    expect(patchResponse.statusCode).toEqual(400);
  });

  it('fails to patch a todo list and returns 400 Bad Request if the ToDos List todos has not a valid shape', async () => {
    const server = createServer();

    // Create ToDos List
    const createTodosListResponse = await request(server)
      .post('/todos')
      .send({
        title: "from test!",
        todos: [{task: 'test is cool', status: todoStatus.Pending}],
      });

    const patchTodosListPayload = {
      title: {ok: 'not ok'},
      todos: [{ok: 'from test'}],
    };

    // Patch ToDos List
    const patchResponse = await request(server)
      .patch(`/todos/${createTodosListResponse.body.id}`)
      .send(patchTodosListPayload);

    expect(patchResponse.statusCode).toEqual(400);
  });

  it('fails to patch a todo list and returns 400 Bad Request if the todo status is invalid', async () => {
    const server = createServer();

    // Create ToDos List
    const createTodosListResponse = await request(server)
      .post('/todos')
      .send({
        title: "from test!",
        todos: [{task: 'test is cool', status: todoStatus.Pending}],
      });

    const patchTodosListPayload = {
      title: {ok: 'not ok'},
      todos: [{task: 'from test', status: 'invalid'}],
    };

    // Patch ToDos List
    const patchResponse = await request(server)
      .patch(`/todos/${createTodosListResponse.body.id}`)
      .send(patchTodosListPayload);

    expect(patchResponse.statusCode).toEqual(400);
  });

  it('patching a non-existent todos list returns 404 and is no-op', async () => {
    const server = createServer();

    const createTodosListPayload = {
      title: "from test!",
      todos: [{task: 'test is cool', status: todoStatus.Pending}],
    };

    // Create ToDos List
    await request(server)
      .post('/todos')
      .send(createTodosListPayload);

    // Patch ToDos List
    const patchResponse = await request(server)
      .patch('/todos/clearlydoesntexist')
      .send({
        title: "patched from test!",
        todos: [{task: 'patching works', status: todoStatus.Pending}],
      });

    expect(patchResponse.statusCode).toEqual(404);

    // Fetch todos lists
    const fetchedLists = await request(server)
      .get('/todos')
      .send();

    expect(fetchedLists.body).toHaveLength(1);
    expect(fetchedLists.body[0].title).toEqual(createTodosListPayload.title);
    expect(fetchedLists.body[0].todos).toEqual(createTodosListPayload.todos);
  });
})