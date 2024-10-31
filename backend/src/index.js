import express from 'express'
import cors from 'cors'
import Database from 'better-sqlite3'

const PORT = 3001
const app = express()
const db = new Database('todos.db')

app.use(cors())
app.use(express.json())

db.transaction(() => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS todos_new (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      list_id TEXT NOT NULL,
      content TEXT NOT NULL,
      completed BOOLEAN DEFAULT 0,
      completed_at TEXT,
      due_date TEXT,
      FOREIGN KEY (list_id) REFERENCES todo_lists(id)
    );

    -- Copy existing data to the new table
    INSERT INTO todos_new (id, list_id, content, completed, due_date)
    SELECT id, list_id, content, completed, due_date
    FROM todos;

    -- Drop the old table
    DROP TABLE IF EXISTS todos;

    -- Rename the new table to the original name
    ALTER TABLE todos_new RENAME TO todos;

    -- Ensure todo_lists table exists
    CREATE TABLE IF NOT EXISTS todo_lists (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL
    );
  `)
})()

app.get('/api/todo-lists', (_, res) => {
  try {
    const lists = db.prepare('SELECT * FROM todo_lists ORDER BY id').all()
    const result = {}

    for (const list of lists) {
      const todos = db
        .prepare('SELECT content, completed, completed_at, due_date FROM todos WHERE list_id = ?')
        .all(list.id)
      result[list.id] = {
        id: list.id,
        title: list.title,
        todos: todos.map((todo) => ({
          content: todo.content,
          completed: todo.completed,
          completedAt: todo.completed_at,
          dueDate: todo.due_date,
        })),
      }
    }

    res.json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/todo-lists/:id', (req, res) => {
  const { id } = req.params

  try {
    const list = db.prepare('SELECT * FROM todo_lists WHERE id = ?').get(id)

    if (!list) {
      return res.status(404).json({ error: 'List not found...' })
    }

    const todos = db
      .prepare('SELECT content, completed, completed_at, due_date FROM todos WHERE list_id = ?')
      .all(id)

    const result = {
      id: list.id,
      title: list.title,
      todos: todos.map((todo) => ({
        content: todo.content,
        completed: todo.completed,
        completedAt: todo.completed_at,
        dueDate: todo.due_date,
      })),
    }

    res.json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post('/api/todo-lists/:id', (req, res) => {
  const { id } = req.params
  const { title, todos } = req.body

  const insertList = db.prepare('INSERT OR REPLACE INTO todo_lists (id, title) VALUES (?, ?)')
  const deleteTodos = db.prepare('DELETE FROM todos WHERE list_id = ?')
  const insertTodo = db.prepare(
    'INSERT INTO todos (list_id, content, completed, completed_at, due_date) VALUES (?, ?, ?, ?, ?)'
  )

  try {
    db.transaction(() => {
      insertList.run(id, title || '')
      deleteTodos.run(id)

      for (const todo of todos) {
        insertTodo.run(
          id,
          todo.content || '',
          todo.completed ? 1 : 0,
          todo.completedAt || null,
          todo.dueDate || null
        )
      }
    })()

    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.delete('/api/todo-lists/:id', (req, res) => {
  const { id } = req.params
  const deleteList = db.prepare('DELETE FROM todo_lists WHERE id = ?')
  const deleteTodos = db.prepare('DELETE FROM todos WHERE list_id = ?')

  try {
    db.transaction(() => {
      deleteTodos.run(id)
      deleteList.run(id)
    })()

    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.listen(PORT, () => console.log(`Todo list server listening on port ${PORT}!`))
