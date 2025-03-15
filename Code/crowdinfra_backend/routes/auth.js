const express = require('express')
const { validateSignup, validateLogin } = require('../middlewares/validation')
const { signupUser, loginUser } = require('../controllers/userController')

const router = express.Router()

router.post('/signup', validateSignup, signupUser)
router.post('/login', validateLogin, loginUser)

module.exports = router
