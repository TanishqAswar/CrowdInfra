const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const getUserModel = require('../models/User')

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key'

// > Signup Controller
const signupUser = async (req, res) => {
  const User = await getUserModel()

  const { name, email, password, phone, address, gender, bio, profile_image } =
    req.body

  try {
    // Check if user already exists
    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ msg: 'User already exists' })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, bcrypt.genSaltSync(10))

    // Create user
    user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      gender,
      bio,
      profile_image: profile_image || '',
    })

    // Save user to database
    await user.save()

    res.status(201).json({
      msg: 'User registered successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        gender: user.gender,
        bio: user.bio,
        profile_image: user.profile_image || '',
        role: user.role,
        createdAt: user.createdAt,
      },
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

// > Login Controller
const loginUser = async (req, res) => {
  const User = await getUserModel()

  const { email, password } = req.body

  try {
    // Check if user exists
    let user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' })
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' })
    }

    // Generate JWT token
    const payload = { user: { id: user.id, role: user.role } }
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' })

    res.status(200).json({ msg: 'Login successful', token })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

module.exports = { signupUser, loginUser }
