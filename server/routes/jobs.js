// server/routes/jobs.js

const express = require('express');
const Job = require('../models/Job');

const router = express.Router();

// POST /api/jobs
// Expects JSON with all fields plus an optional `media` array
router.post('/', async (req, res) => {
  try {
    const {
      poster,
      tenantName,
      tenantPhone,
      category,
      description,
      media = [],
      urgency,
      scheduledFor,
      address,
      postcode,
    } = req.body;

    // Basic validation
    if (!poster || !tenantName || !tenantPhone || !category || !address || !postcode) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const job = new Job({
      poster,
      tenantName,
      tenantPhone,
      category,
      description,
      media,               // now just an array of strings
      urgency,
      scheduledFor: scheduledFor || undefined,
      address,
      postcode,
    });

    await job.save();
    return res.json(job);
  } catch (err) {
    console.error('Create job error:', err);
    return res.status(500).json({ error: 'Server error during job creation' });
  }
});

// GET /api/jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    return res.json(jobs);
  } catch (err) {
    console.error('Fetch jobs error:', err);
    return res.status(500).json({ error: 'Server error fetching jobs' });
  }
});

module.exports = router;
