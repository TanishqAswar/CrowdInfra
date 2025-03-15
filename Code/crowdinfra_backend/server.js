// All Libraries
const express = require("express");
const connectDBs = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");

// Import Routes
// const userRoutes = require("./routes/userRoutes");
// const propertyRoutes = require("./routes/propertyRoutes");
// const demandRoutes = require("./routes/demandRoutes");
const authRoutes = require("./routes/auth");

// Configs
dotenv.config();
connectDBs();

const app = express();

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/properties', propertyRoutes);
// app.use('/api/demands', demandRoutes);


// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
