// server/routes/users.js

require('dotenv').config();
const express = require('express');
const bcrypt  = require('bcrypt');
const jwt     = require('jsonwebtoken');
const User    = require('../models/User');
const router  = express.Router();

// POST /api/users/register
router.post('/register', async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      userType,
      companyName,
      address,
      postcode,
      phone,
      callOutCharge
    } = req.body;

    // Check for existing user
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Build new user document
    const user = new User({
      fullName,
      email,
      passwordHash,
      userType,
      companyName,
      address,
      postcode,
      phone,
      ...(callOutCharge != null ? { callOutCharge } : {})
    });

    await user.save();

    // Sign JWT
    const token = jwt.sign(
      { id: user._id, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return token + minimal profile
    res.json({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        userType: user.userType,
        companyName: user.companyName,
        address: user.address,
        postcode: user.postcode,
        phone: user.phone,
        callOutCharge: user.callOutCharge
      }
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/users/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Compare passwords
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Sign JWT
    const token = jwt.sign(
      { id: user._id, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return token + minimal profile
    res.json({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        userType: user.userType,
        companyName: user.companyName,
        address: user.address,
        postcode: user.postcode,
        phone: user.phone,
        callOutCharge: user.callOutCharge
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
