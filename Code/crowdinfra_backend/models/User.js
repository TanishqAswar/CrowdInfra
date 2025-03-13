const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    role: { type: Number, default: 0 }, // 0 -> Normal user, 1 -> Admin
    gender: { type: String, required: true },
    bio: { type: String, required: true },
    profile_image: { type: String, },

    // Store Property IDs created by the user
    properties_created: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property', // Reference to Property Schema
      },
    ],

    // Store Demand IDs raised by the user
    demands_raised: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Demand', // Reference to Demand Schema
      },
    ],
  },
  { timestamps: true }
)

module.exports = global.usersDB.model('User', userSchema)
