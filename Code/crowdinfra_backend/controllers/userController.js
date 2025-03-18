const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const getUserModel = require('../models/User')
const path = require('path');
const fs = require('fs')
const colors = require('colors')

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key'

const saveProfilePhoto = (userId, file) => {
  if (!file) return '' // No file uploaded

  const uploadDir = path.join(__dirname, '../uploads')
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true })

  const ext = path.extname(file.originalname) // Get file extension
  const filename = `${userId}${ext}` // Store as userId.extension
  const filePath = path.join(uploadDir, filename)

  fs.writeFileSync(filePath, file.buffer) // Save file

  return `/uploads/${filename}` // Return file path
}

//> Signup Controller
const signupUser = async (req, res) => {
  const User = await getUserModel()

  const { name, email, password, phone, address, gender, bio } = req.body
  const profilePhoto = req.file // Uploaded file

  try {
    // Check if user already exists
    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ msg: 'User already exists' })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, bcrypt.genSaltSync(10))

    // Step 1: Create User First (Without Profile Photo)
    user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      gender,
      bio,
      profile_image: "", // Initially empty
    })
    
    await user.save() // Save user to generate `_id`

    // Step 2: Now Save Profile Photo with `_id`
    let profileImagePath = ""
    if (profilePhoto) {
      profileImagePath = saveProfilePhoto(user._id, profilePhoto)
      user.profile_image = profileImagePath
      await user.save() // Update user with image path
    }

    console.log(JSON.stringify(user, null, 2))

    // Return response
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
        profile_image: profileImagePath,
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

  console.log(JSON.stringify(req.body, null, 2))

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
