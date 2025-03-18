const express = require("express");
const jwt = require("jsonwebtoken");
const getUserModel = require("../models/User"); // Import the function

const router = express.Router();

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) return res.status(401).json({ error: "Access Denied" });

  try {
    const verified = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    req.decodedData = verified;

    console.log("The token is valid");
    next();
  } catch (err) {
    console.log(err)
    res.status(400).json({ error: "Invalid Token" });
  }
};

// Get User Profile
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const User = await getUserModel(); // Get the User model
    // const user = await User.findById(req.user.userId)
    console.log(JSON.stringify(req.decodedData, null, 2))
    
    const user = await User.findById(req.decodedData.user.id).select(
      '-password'
    )  

    console.log(JSON.stringify(user, null, 2));
    
    if (!user) return res.status(404).json({ error: "User not found" });
    
    res.status(200).json(user);
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
