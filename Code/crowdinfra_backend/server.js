//> Load environment variables at the very top
require('dotenv').config()

//> All Libraries
const express = require('express')
const listEndpoints = require('express-list-endpoints')
const connectDBs = require('./config/db')
const cors = require('cors')
const colors = require('colors')
const morgan = require('morgan')

//> Import Routes
// const userRoutes = require("./routes/userRoutes");
const propertyRoutes = require("./routes/property");
// const demandRoutes = require("./routes/demandRoutes");
const authRoutes = require('./routes/auth')

const app = express()

;(async () => {
  try {
    const { usersDB } = await connectDBs() // Establish connections

    // Middlewares
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())
    app.use(cors())
    app.use(morgan('dev'))

    // Routes
    app.use('/api/auth', authRoutes)
    app.use('/api/property' ,propertyRoutes)

    // Environment Variables
    console.log('=========================================='.yellow)
    console.log('🚀 Database Connection URIs'.cyan.bold)
    console.log('=========================================='.yellow)
    console.log(
      '📌 USERS_DB_URI:      '.magenta +
        process.env.USERS_DB_URI.italic
    )
    console.log(
      '📌 PROPERTIES_DB_URI: '.magenta +
        process.env.PROPERTIES_DB_URI.italic
    )
    console.log(
      '📌 DEMANDS_DB_URI:    '.magenta +
        process.env.DEMANDS_DB_URI.italic
    )
    console.log('=========================================='.yellow)

    // Server
    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`.blue.bgGreen))

    // Print all registered routes
    console.log(listEndpoints(app))

    
  } catch (err) {
    console.error('❌ Server Initialization Error:', err.message)
    process.exit(1) 
  }
})()
