const mongoose = require('mongoose')

const connectDBs = async () => {
  try {
    usersDB =await  mongoose.createConnection(process.env.USERS_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    propertiesDB = await mongoose.createConnection(
      process.env.PROPERTIES_DB_URI,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    demandsDB = await  mongoose.createConnection(process.env.DEMANDS_DB_URI, {
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
