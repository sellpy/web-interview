const mongoose = require('mongoose')

const { MONGO_HOST, MONGO_PORT, MONGO_DB, MONGO_USER, MONGO_PASSWORD } = process.env

const uri = `mongodb://${MONGO_HOST}:${MONGO_PORT}`

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: MONGO_DB,
      user: MONGO_USER,
      pass: MONGO_PASSWORD,
    })

    console.log('Connected to MongoDB.')
  } catch (err) {
    console.error(`MongoDB: ${err.message}.`)
    process.exit(1)
  }
}

module.exports = connectDB
