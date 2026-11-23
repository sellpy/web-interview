import Datastore from '@seald-io/nedb'

export const UserMessages = new Datastore({ inMemoryOnly: true })

await UserMessages.insertAsync({ key: 'greeting', value: 'Hello World!' })
