const express = require('express')
const multer = require('multer')
const path = require('path')
const { validateSignup, validateLogin } = require('../middlewares/validation')
const {
  signupUser,
    loginUser,
  //   updateProfilePhoto,
} = require('../controllers/userController')

const router = express.Router()

// Multer storage setup (stores files in memory)
const storage = multer.memoryStorage()
const upload = multer({ storage })

// Signup route with profile photo upload
router.post(
  '/signup',
  upload.single('profilePhoto'),
  validateSignup,
  signupUser
)

// Login route
router.post('/login', validateLogin, loginUser)

module.exports = router
