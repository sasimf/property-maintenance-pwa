// server/routes/jobs.js
const express = require('express');
const Job     = require('../models/Job');
const router  = express.Router();

router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find()
      // pull in everything we care about from the poster:
      .populate(
        'poster',
        'fullName phone companyName userType callOutCharge'
      )
      // if you also need tenant info:
      .populate(
        'tenant',
        'fullName phone'
      )
      .sort({ createdAt: -1 });

    res.json(jobs);
  } catch (err) {
    console.error('Fetch jobs error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
