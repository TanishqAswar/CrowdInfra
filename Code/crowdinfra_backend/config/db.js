const mongoose = require('mongoose')

const connectDBs = async () => {
  try {
    global.usersDB = mongoose.createConnection(process.env.USERS_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    global.propertiesDB = mongoose.createConnection(
      process.env.PROPERTIES_DB_URI,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    global.demandsDB = mongoose.createConnection(process.env.DEMANDS_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log('All Databases Connected...')
  } catch (err) {
    console.error('DB Connection Error:', err.message)
    process.exit(1)
  }
}

module.exports = connectDBs
