import path from 'node:path'
import Datastore from '@seald-io/nedb'

export const UserMessages = new Datastore({
  filename: path.join(import.meta.dirname, '../db/UserMessages.db'),
})

await UserMessages.loadDatabaseAsync()

async function seedGreeting() {
  const greeting = await UserMessages.findOneAsync({ key: 'greeting' })
  if (greeting) return
  await UserMessages.insertAsync({ key: 'greeting', value: 'Hello World!' })
}

await seedGreeting()
