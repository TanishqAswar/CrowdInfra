const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const getUserModel = require('../models/User')
const path = require('path')
const fs = require('fs')
const colors = require('colors')
const nodemailer = require('nodemailer')

// Use a strong environment-specific secret with fallback for development only
const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) {
  console.error(
    'WARNING: JWT_SECRET environment variable not set. Using insecure default for development only.'
  )
}

const saveProfilePhoto = (userId, file) => {
  if (!file) {
    console.log('No file provided for upload')
    return ''
  }

  try {
    // Use an absolute path relative to project root
    const uploadDir = path.join(process.cwd(), 'uploads')
    console.log(`Creating upload directory: ${uploadDir}`)

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
      console.log(`Created directory: ${uploadDir}`)
    }

    // Rest of your function remains the same
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.avif']
    const ext = path.extname(file.originalname).toLowerCase()

    if (!allowedExtensions.includes(ext)) {
      throw new Error('Invalid file type. Only JPG, PNG and GIF are allowed.')
    }

    const filename = `${userId}${ext}`
    const filePath = path.join(uploadDir, filename)

    console.log(`Saving file to: ${filePath}`)
    fs.writeFileSync(filePath, file.buffer)

    console.log(`Profile photo saved: ${filePath}`)

    return `/uploads/${filename}`
  } catch (error) {
    console.error(`Error saving profile photo: ${error}`)
    return '' // Return empty string but don't throw, to continue registration
  }
}

// Generate a stronger 6-digit OTP
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000) // Generates a 6-digit number (100000-999999)
}

// Use a more persistent storage solution in production
// This is a simple in-memory store for demonstration
let otpStore = {}

//> Send OTP function
const sendOtp = async (req, res) => {
  const { email } = req.body
  if (!email) return res.status(400).json({ error: 'Email is required' })

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' })
  }

  const otp = generateOtp()
  otpStore[email] = { otp, expires: Date.now() + 300000 } // Expires in 5 min

  // Only log in development environment
  if (process.env.NODE_ENV === 'development') {
    console.log(`OTP for ${email}: ${otp}`) // For debugging only
  }

  try {
    // Validate required environment variables
    if (!process.env.EMAIL || !process.env.PASSWORD) {
      throw new Error('Email service credentials are not properly configured')
    }

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    })

    await transporter.sendMail({
      from: `"CrowdInfra Security" <${process.env.EMAIL}>`,
      to: email,
      subject: '🔑 Your Secure OTP Code - CrowdInfra',
      html: `
    <div style="background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); padding: 40px 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center">
        <table width="550px" style="background-color: #ffffff; border-radius: 16px; box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12); overflow: hidden; margin: 0 auto;">
          <!-- Header with gradient -->
          <tr>
            <td style="background: linear-gradient(90deg, #3a7bd5 0%, #00d2ff 100%); padding: 30px 0; text-align: center;">
              <img src="https://api.dicebear.com/6.x/identicon/svg?seed=CrowdInfra&backgroundColor=ffffff" width="80" height="80" style="display: inline-block; border-radius: 50%; background: white; padding: 5px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);" alt="CrowdInfra Logo">
              <h1 style="color: #ffffff; font-size: 24px; margin: 15px 0 5px; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); letter-spacing: 1px;">SECURITY VERIFICATION</h1>
              <p style="color: rgba(255, 255, 255, 0.9); font-size: 14px; margin: 0; font-weight: 300;">Protecting your account with advanced security</p>
            </td>
          </tr>
          
          <!-- Main content -->
          <tr>
            <td style="padding: 40px 50px 30px;">
              <p style="font-size: 16px; color: #555555; margin-top: 0;">Hello,</p>
              <p style="font-size: 16px; color: #555555;">We received a request to verify your identity. Use the verification code below to complete the process:</p>
              
              <!-- OTP Display -->
              <div style="text-align: center; margin: 35px 0;">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td align="center">
                      <div style="display: inline-block; background: linear-gradient(90deg, #3a7bd5 0%, #00d2ff 100%); padding: 3px; border-radius: 12px; box-shadow: 0 8px 20px rgba(58, 123, 213, 0.3);">
                        <div style="background-color: white; border-radius: 10px; padding: 5px;">
                          <span style="display: block; font-size: 38px; font-weight: 700; letter-spacing: 6px; padding: 10px 30px; color: #333; font-family: 'Courier New', monospace;">
                            ${otp}
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
              
              <!-- Timer section -->
              <div style="text-align: center; margin: 30px 0;">
                <div style="display: inline-block; background-color: #f8f9fa; border-radius: 8px; padding: 15px 25px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td width="24" valign="middle">
                        <img src="https://api.iconify.design/mdi:timer-outline.svg?color=%23666" width="24" height="24" alt="Timer">
                      </td>
                      <td valign="middle" style="padding-left: 10px; text-align: left;">
                        <span style="font-size: 14px; color: #666;">This code expires in <strong>5 minutes</strong></span>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
              
              <p style="font-size: 16px; color: #555555;">If you didn't request this code, please ignore this email or <a href="#" style="color: #3a7bd5; text-decoration: none; font-weight: 500;">contact support</a> if you have concerns.</p>
            </td>
          </tr>
          
          <!-- Security tips -->
          <tr>
            <td style="padding: 0 50px 40px;">
              <div style="background-color: #f8f9fa; border-left: 4px solid #ffc107; border-radius: 6px; padding: 15px 20px;">
                <h3 style="color: #444; font-size: 16px; margin: 0 0 10px; display: flex; align-items: center;">
                  <span style="display: inline-block; width: 18px; height: 18px; margin-right: 8px;">
                    <img src="https://api.iconify.design/mdi:shield-lock-outline.svg?color=%23ffc107" width="18" height="18" alt="Security">
                  </span>
                  Security Tip
                </h3>
                <p style="font-size: 14px; color: #666; margin: 0;">
                  CrowdInfra will never ask for your password or full account details via email. Always verify that login pages are secure before entering your credentials.
                </p>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f5f7fa; padding: 30px 50px; border-top: 1px solid #eaeaea;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="text-align: center;">
                    <p style="font-size: 13px; color: #999999; margin: 0 0 10px;">
                      © 2025 CrowdInfra Technologies • All rights reserved
                    </p>
                    <div style="margin: 15px 0;">
                      <!-- Social icons (using placeholder APIs for icons) -->
                      <a href="#" style="display: inline-block; margin: 0 5px;"><img src="https://api.iconify.design/mdi:twitter.svg?color=%233a7bd5" width="20" height="20" alt="Twitter"></a>
                      <a href="#" style="display: inline-block; margin: 0 5px;"><img src="https://api.iconify.design/mdi:linkedin.svg?color=%233a7bd5" width="20" height="20" alt="LinkedIn"></a>
                      <a href="#" style="display: inline-block; margin: 0 5px;"><img src="https://api.iconify.design/mdi:facebook.svg?color=%233a7bd5" width="20" height="20" alt="Facebook"></a>
                    </div>
                    <p style="font-size: 12px; color: #999999; margin: 10px 0 0;">
                      <a href="#" style="color: #777; text-decoration: none; margin: 0 10px;">Privacy Policy</a>
                      <a href="#" style="color: #777; text-decoration: none; margin: 0 10px;">Terms of Service</a>
                      <a href="#" style="color: #777; text-decoration: none; margin: 0 10px;">Contact Us</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        
        <!-- Email client support message -->
        <p style="font-size: 12px; color: #999999; text-align: center; margin-top: 20px;">
          If you're having trouble viewing this email, <a href="#" style="color: #3a7bd5; text-decoration: none;">view it in your browser</a>
        </p>
      </td>
    </tr>
  </table>
</div>
  `,
    })

    res.json({ message: 'OTP sent successfully' })
  } catch (error) {
    console.error('OTP sending error:', error.message)
    res
      .status(500)
      .json({ error: 'Failed to send OTP. Please try again later.' })
  }
}

//> Verify OTP function
const verifyOtp = async (req, res) => {
  const { email, otp } = req.body

  if (!email || !otp) {
    return res.status(400).json({ error: 'Email and OTP are required' })
  }

  const storedOtpData = otpStore[email]

  if (!storedOtpData) {
    return res
      .status(400)
      .json({ error: 'No OTP was requested for this email' })
  }

  if (Date.now() > storedOtpData.expires) {
    delete otpStore[email] // Clean up expired OTP
    return res
      .status(400)
      .json({ error: 'OTP has expired. Please request a new one.' })
  }

  if (parseInt(otp) !== storedOtpData.otp) {
    return res.status(400).json({ error: 'Invalid OTP' })
  }

  // OTP is valid - clean up and proceed
  delete otpStore[email]
  return res.json({ verified: true, message: 'Email verified successfully' })
}

//> Signup Controller
const signupUser = async (req, res) => {
  const User = await getUserModel()

  const { name, email, password, phone, address, gender } = req.body
  const profilePhoto = req.file // Uploaded file

  try {
    // Input validation
    if (!name || !email || !password) {
      console.log('Missing required fields'.red)
      return res
        .status(400)
        .json({ error: 'Name, email and password are required' })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.log('Invalid email format'.red)
      return res.status(400).json({ error: 'Invalid email format' })
    }

    // Validate password strength
    if (password.length < 6) {
      console.log('Weak password'.red)
      return res
        .status(400)
        .json({ error: 'Password must be at least 6 characters long' })
    }

    // Check if user already exists
    let user = await User.findOne({ email })
    if (user) {
      console.log('User already exists'.red)
      return res.status(400).json({ error: 'User already exists' })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Step 1: Create User First (Without Profile Photo)
    user = new User({
      name,
      email,
      password: hashedPassword,
      phone: phone || '',
      address: address || '',
      gender: gender || '',
      profile_image: '', // Initially empty
    })

    await user.save() // Save user to generate `_id`

    // Step 2: Now Save Profile Photo with `_id`
    let profileImagePath = ''
    if (profilePhoto) {
      try {
        profileImagePath = saveProfilePhoto(user._id, profilePhoto)
        user.profile_image = profileImagePath
        await user.save() // Update user with image path
      } catch (photoError) {
        console.error('Profile photo error:', photoError.message)
        // Continue registration even if photo upload fails
      }
    }

    // Return response (exclude password from response)
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        gender: user.gender,
        profile_image: profileImagePath,
        role: user.role,
        createdAt: user.createdAt,
      },
    })
  } catch (err) {
    console.error('Signup error:', err.message)
    res
      .status(500)
      .json({ error: 'Server error during registration. Please try again.' })
  }
}

// > Login Controller
const loginUser = async (req, res) => {
  const User = await getUserModel()
  const { email, password } = req.body

  try {
    // Input validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    // Check if user exists
    let user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' })
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' })
    }

    // Generate JWT token
    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    }

    // Make sure JWT_SECRET is defined before signing
    if (!JWT_SECRET) {
      return res
        .status(500)
        .json({ error: 'Authentication service misconfigured' })
    }

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '10h' })

    // Set cookie based on environment
    const isProduction = process.env.NODE_ENV === 'production'

    res.cookie('crowdInfra_token', token, {
      httpOnly: true, // Always HTTP-only for security
      secure: true, // Secure in production
      sameSite: isProduction ? 'None' : 'Lax', // None for cross-origin in prod, Lax for dev
      partitioned: true, // Enable CHIPS for cross-origin cookies
      maxAge: 10 * 60 * 60 * 1000, // 10 hours in milliseconds
    })

    res.status(200).json({ message: 'Login successful', success: true })
  } catch (err) {
    console.error('Login error:', err.message)
    res
      .status(500)
      .json({ error: 'Server error during login. Please try again.' })
  }
}

//> Logout controller
const logoutUser = (req, res) => {
  res.clearCookie('crowdInfra_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Only secure in production
    sameSite: 'Strict',
  })

  res.status(200).json({ success: true, message: 'Logged out successfully' })
}

module.exports = {
  signupUser,
  loginUser,
  logoutUser,
  sendOtp,
  verifyOtp,
}
