const mongoose = require('mongoose')

const { MONGODB_URI, MONGODB_URI_TEST, NODE_ENV } = process.env

const connectionString = NODE_ENV === 'test' ? MONGODB_URI_TEST : MONGODB_URI

// conexion a mongodb
mongoose.connect(connectionString)
  .then(() => {
    console.log('Database is connected successfully')
  })
  .catch((err) => console.error(err))

process.on('uncaughtException', () => {
  mongoose.connection.close()
})

module.exports = mongoose
