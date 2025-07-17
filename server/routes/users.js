const express   = require('express');
const bcrypt    = require('bcrypt');
const jwt       = require('jsonwebtoken');
const User      = require('../models/User');
const router    = express.Router();

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

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

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

    const token = jwt.sign(
      { id: user._id, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token, userType: user.userType });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
