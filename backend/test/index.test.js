import assert from 'node:assert/strict'
import { once } from 'node:events'
import { after, before, test } from 'node:test'
import { app } from '../src/index.js'
import { UserMessages } from '../src/db.js'

let server
let url

before(async () => {
  server = app.listen(0, '127.0.0.1')
  await once(server, 'listening')
  url = `http://127.0.0.1:${server.address().port}`
})

after(async () => {
  const closed = once(server, 'close')
  server.close()
  await closed
})

test('GET / returns the greeting inserted on startup', async () => {
  const response = await fetch(url)

  assert.equal(response.status, 200)
  assert.equal(await response.text(), 'Hello World!')
  assert.equal((await UserMessages.findOneAsync({ key: 'greeting' })).value, 'Hello World!')
})

test('GET / reads the current greeting from UserMessages', async t => {
  t.after(() => UserMessages.updateAsync({ key: 'greeting' }, { $set: { value: 'Hello World!' } }))
  await UserMessages.updateAsync({ key: 'greeting' }, { $set: { value: 'Hello from the database!' } })

  const response = await fetch(url)

  assert.equal(response.status, 200)
  assert.equal(await response.text(), 'Hello from the database!')
})

test('GET / returns 500 when the greeting is missing', async t => {
  t.after(() => UserMessages.insertAsync({ key: 'greeting', value: 'Hello World!' }))
  await UserMessages.removeAsync({ key: 'greeting' })

  const response = await fetch(url)

  assert.equal(response.status, 500)
})

test('GET / returns 500 when the database query fails', async t => {
  t.mock.method(UserMessages, 'findOneAsync', async () => {
    throw new Error('Database query failed')
  })

  const response = await fetch(url)

  assert.equal(response.status, 500)
})
