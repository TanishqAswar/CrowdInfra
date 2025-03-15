const mongoose = require('mongoose')

// Suppress strictQuery warnings
mongoose.set('strictQuery', true)

const connectDBs = async () => {
  try {
    const usersDB = await mongoose.createConnection(process.env.USERS_DB_URI)
    const propertiesDB = await mongoose.createConnection(
      process.env.PROPERTIES_DB_URI
    )
    const demandsDB = await mongoose.createConnection(
      process.env.DEMANDS_DB_URI
    )

    console.log('✅ All Databases Connected...'.green)
    return { usersDB, propertiesDB, demandsDB }
  } catch (err) {
    console.error('❌ DB Connection Error:', err.message)
    process.exit(1)
  }
}

module.exports = connectDBs
